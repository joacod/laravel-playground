import { Head, router, usePage } from '@inertiajs/react';
import React, { useState } from 'react';

export default function Todo() {
    type TodoType = {
        id: number;
        title: string;
        description?: string | null;
        completed: boolean;
        created_at: string;
        updated_at: string;
    };
    const { todos, flash } = usePage().props as unknown as { todos: TodoType[]; flash?: { success?: string } };
    const [form, setForm] = useState({ title: '', description: '' });
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState({ title: '', description: '', completed: false });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/todos', form, {
            onSuccess: () => setForm({ title: '', description: '' }),
        });
    };

    const handleEdit = (todo: TodoType) => {
        setEditingId(todo.id);
        setEditForm({ title: todo.title, description: todo.description || '', completed: !!todo.completed });
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const handleEditCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditForm({ ...editForm, completed: e.target.checked });
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            router.put(`/todos/${editingId}`, editForm, {
                onSuccess: () => setEditingId(null),
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this todo?')) {
            router.delete(`/todos/${id}`);
        }
    };

    return (
        <>
            <Head title="Todo App" />
            <div className="container mx-auto mt-5 min-h-screen max-w-xl p-4 dark:bg-gray-900 dark:text-gray-100">
                <h1 className="mb-4 text-2xl font-bold">Todo App</h1>
                {flash?.success && (
                    <div className="mb-4 rounded bg-green-900/80 p-2 text-green-200 dark:bg-green-900/80 dark:text-green-200">{flash.success}</div>
                )}
                {/* Create Todo Form */}
                <form onSubmit={handleSubmit} className="mb-6 rounded bg-white p-4 shadow dark:bg-gray-800 dark:shadow-lg">
                    <div className="mb-2">
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Title"
                            className="w-full rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Description (optional)"
                            className="w-full rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                    </div>
                    <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white dark:bg-blue-500 dark:hover:bg-blue-400">
                        Add Todo
                    </button>
                </form>

                {/* Todo List */}
                <ul className="space-y-4">
                    {todos && todos.length > 0 ? (
                        todos.map((todo: TodoType) => (
                            <li key={todo.id} className="flex flex-col gap-2 rounded bg-white p-4 shadow dark:bg-gray-800 dark:shadow-lg">
                                {editingId === todo.id ? (
                                    <form onSubmit={handleUpdate} className="flex flex-col gap-2">
                                        <input
                                            type="text"
                                            name="title"
                                            value={editForm.title}
                                            onChange={handleEditChange}
                                            className="rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                                            required
                                        />
                                        <textarea
                                            name="description"
                                            value={editForm.description}
                                            onChange={handleEditChange}
                                            className="rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                                        />
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                name="completed"
                                                checked={!!editForm.completed}
                                                onChange={handleEditCheckbox}
                                                className="dark:border-gray-600 dark:bg-gray-700"
                                            />
                                            Completed
                                        </label>
                                        <div className="flex gap-2">
                                            <button
                                                type="submit"
                                                className="rounded bg-green-600 px-3 py-1 text-white dark:bg-green-700 dark:hover:bg-green-600"
                                            >
                                                Save
                                            </button>
                                            <button
                                                type="button"
                                                className="rounded bg-gray-400 px-3 py-1 text-white dark:bg-gray-700 dark:hover:bg-gray-600"
                                                onClick={() => setEditingId(null)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className={todo.completed ? 'text-gray-500 line-through dark:text-gray-400' : ''}>
                                                    {todo.title}
                                                </span>
                                                {todo.description && (
                                                    <div className="text-sm text-gray-600 dark:text-gray-300">{todo.description}</div>
                                                )}
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    className="rounded bg-yellow-500 px-2 py-1 text-white dark:bg-yellow-600 dark:hover:bg-yellow-500"
                                                    onClick={() => handleEdit(todo)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="rounded bg-red-600 px-2 py-1 text-white dark:bg-red-700 dark:hover:bg-red-600"
                                                    onClick={() => handleDelete(todo.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                        <div className="text-xs text-gray-400 dark:text-gray-500">
                                            Created: {new Date(todo.created_at).toLocaleString()}
                                        </div>
                                    </>
                                )}
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-500 dark:text-gray-400">No todos yet.</li>
                    )}
                </ul>
            </div>
        </>
    );
}
