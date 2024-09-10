import React, { useState, useEffect } from 'react';

// 定义用户接口
interface User {
  id: string;
  name: string;
}

// 定义主组件
function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <UserSelector />
      </div>
    </div>
  );
}

// 定义用户选择器组件
function UserSelector() {
  const [users, setUsers] = useState<User[]>([]); // 用户列表状态
  const [searchTerm, setSearchTerm] = useState<string>(''); // 搜索词状态
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]); // 过滤后的用户列表状态

  // 获取用户列表数据
  useEffect(() => {
    fetch('https://66a88ab2e40d3aa6ff586722.mockapi.io/api/v1/get_user_list')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('数据错误---- error:', error));
  }, []);

  // 根据搜索词过滤用户列表
  useEffect(() => {
    setFilteredUsers(
      users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, users]);

  // 点击选项显示名称
  const handleUserClick = (name: string) => {
    setSearchTerm(name);
  };

  return (
    <div className="space-y-4">
      <div className="sticky top-0 bg-white z-10 p-4">
        <input
          type="text"
          placeholder="Search users"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <ul className="space-y-2 mt-6">
        {filteredUsers.map(user => (
          <li
            key={user.id}
            className="p-2 bg-gray-100 rounded cursor-pointer"
            onClick={() => handleUserClick(user.name)}
          >
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
