import { db } from '../db/db';
import { eq } from 'drizzle-orm';
import { Decisions, NewDecisions, RoleChangeRequests } from '@src/db';


export const VoteModel = {

    voteSubmit:async(data:NewDecisions)=>{
       return await db.insert(Decisions).values({
            request_id: data.request_id, 
            member_id: data.member_id,
            result: data.result,
       }).returning();
    },
    
} 