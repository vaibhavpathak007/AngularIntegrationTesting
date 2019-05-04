import { routes } from './app.routes';
import { UsersComponent } from './users/users.component';

describe('Router', ()=>{
    it('should contain /user to load UserComponent',()=>{
        expect(routes).toContain({ path: 'users', component: UsersComponent });
    })
}) 