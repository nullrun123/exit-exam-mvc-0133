import { Context } from "hono";
import { MembersModel, RequestModel, RoleType  } from '@src/models';
import { db } from "@src/db/db";
import { eq } from "drizzle-orm";
import { RoleChangeRequests } from "@src/db";


export const VotesController = {
   vote:async(c:Context)=>{
    
   }
}

