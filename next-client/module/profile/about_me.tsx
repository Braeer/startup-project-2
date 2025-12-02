'use client';

import { Container } from '@/components/ui/container';
import { getMyProfile } from '@/services/profile/get_profile';
import { useEffect, useState } from 'react';

const Item = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>
      <span className="bg-acent text-white p-2 rounded-main">{value}</span>
    </div>
  );
};

export function AboutMeModule() {
  const [data, setData] = useState({ email: '', username: '', specialization: '' });

  useEffect(() => {
    getMyProfile().then((res) => {
      setData(res || { email: '', username: '', specialization: '' });
    });
  }, []);

  return (
    <Container>
      <div className="flex flex-col gap-4 my-4">
        <Item label="Почта" value={data.email} />
        <Item label="Имя" value={data.username} />
        <Item label="Специализация" value={data.specialization} />
      </div>
    </Container>
  );
}
