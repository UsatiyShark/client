import { createRouter, createWebHistory } from 'vue-router'
import Employee from './src/views/Employee.vue'

const routes = [
    {
        path: '/',
        name: 'Employee',
        component: Employee
    },
    {
        path: '/admin',
        name: 'Admin',
        meta: {page:'admin'},
        component: () => import('@/views/Admin.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router