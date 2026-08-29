import { MembersController } from '@src/controllers/member.controller';
import { Hono } from 'hono'

const promiseApp = new Hono()

promiseApp.get('/', MembersController.getAllMember);

export default promiseApp
