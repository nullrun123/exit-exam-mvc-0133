import { Context } from "hono";

import { db } from "@src/db/db";
import { eq } from "drizzle-orm";
import { Members, NewDecisions, RoleChangeRequests} from "@src/db";
import { VoteModel } from "@src/models";


export const VotesController = {
    // สร้าง Votedecision
   vote:async(c:Context)=>{
    // เอา id user มา
        const id = c.req.param('id');

        if(!id){
            return c.json({ errors: ["ID parameter is required"] }, 400);
        }
        
        const [isActive] = await db.select({
            active:Members.active
        }).from(Members).where(eq(Members.id,id));

        if(!isActive){
            return c.json({
               errors: ["Member not active"]
            },400)
        }

        const {request_id ,result} = await c.req.json();

        const decision:NewDecisions = {
            request_id:request_id,
            member_id:id,
            result:result
        }

        const data = await VoteModel.voteSubmit(decision);
        
        return c.json({
            message:"Vote successful",
            decision
        })

   }
}

