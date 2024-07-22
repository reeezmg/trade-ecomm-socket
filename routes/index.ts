import { t } from "../trpc"
import { observable } from "@trpc/server/observable"
import { EventEmitter } from "stream"

const eventEmitter = new EventEmitter()
export  const appRouter = t.router({
    sayHi: t.procedure.query(() => {
        eventEmitter.emit("update","hi")
        return "Hi"
    }),
    socket:t.procedure.subscription(()=>{
        return observable<string>(emit => {
            function onMessage(data: string) {
        
                  emit.next(data);
                
              }
            eventEmitter.on("update", emit.next)

            return () => {
                eventEmitter.off("update",emit.next)
            }
        })
    })
})

export type appRouter = typeof appRouter;