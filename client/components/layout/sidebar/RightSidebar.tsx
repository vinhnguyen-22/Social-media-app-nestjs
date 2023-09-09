import UserListCard from '@/components/common/UserListCard/UserListCard';

const UserList = [
  {
    id: 1,
    name: 'Vincent Azure',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    username: 'vincent',
  },
];

export default function RightSidebar() {
  return (
    <div className='hidden h-screen border-l-2 lg:block lg:w-1/4 lg:pt-5 xl:p-5'>
      <h1 className='text-2xl font-bold'>Suggestion for you</h1>

      <div className='mt-5'>
        {UserList.map((item) => (
          <UserListCard key={item.id} user={item} />
        ))}
      </div>
    </div>
  );
}
