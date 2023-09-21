import { Layout, Users, AddUsers } from '@/views/adminPanel';

export default {
    path: '/admin',
    component: Layout,
    children: [      
        { path: 'users', component: Users },
        { path: 'users/add', component: AddUsers }
    ]

};
