import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-col gap-6 p-8">
                <h1 className="text-2xl font-bold">Welcome to your Dashboard</h1>
                <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                    <h2 className="mb-2 text-xl font-semibold">Todo App</h2>
                    <p className="mb-4 text-gray-600 dark:text-gray-300">Manage your tasks efficiently with the Todo app.</p>
                    <Link href="/todos" className="inline-block rounded bg-blue-600 px-4 py-2 text-white dark:bg-blue-500 dark:hover:bg-blue-400">
                        Go to Todo App
                    </Link>
                    {/* You can add todo stats here, e.g., total todos, completed, etc. */}
                </div>
            </div>
        </AppLayout>
    );
}
