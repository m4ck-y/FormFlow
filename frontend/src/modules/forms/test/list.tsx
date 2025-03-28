import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Skeleton } from 'antd';
import { http } from '../../../api/http';

interface TypeForm {
    key: string;
    name: string;
    description: string;
    id: number;
}

const ListForms: React.FC = () => {

  const [formList, setFormList] = useState<TypeForm[]>([]);

  useEffect(() => {

      http.get<TypeForm[]>(`/form/list`).then((response) => {
        console.log(response.value);
        setFormList(response.value || []);
      });
  }, []);


  return (
    <List
      className="demo-loadmore-list"
      //loading={initLoading}
      itemLayout="horizontal"
      dataSource={formList}
      renderItem={(item) => (
        <List.Item
          actions={[<a key="list-loadmore-more">more</a>]}
        >
            <List.Item.Meta
              //avatar={<Avatar src={item.picture.large} />}
              title={<a href="https://ant.design">{item.name}</a>}
              description={item.description}
            />
            <div>{item.key}</div>
        </List.Item>
      )}
    />
  );
};

export default ListForms;