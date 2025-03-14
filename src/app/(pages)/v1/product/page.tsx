'use client'

import { Space, Table, TableProps, Tag } from "antd";

const Product = () => {

    const columns: TableProps<any>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Утасны дугаар',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Урамшууллын оноо',
            dataIndex: 'onoo',
            key: 'onoo',
        },
        {
            title: 'Сүүлийн зарцуулалт',
            dataIndex: 'last_use',
            key: 'last_use',
        },
        {
            title: 'Бүртгүүлсэн огноо',
            dataIndex: 'created',
            key: 'created',
        },
        {
            title: 'Сүүлд нэвтэрсэн огноо',
            dataIndex: 'last_login',
            key: 'last_login',
        },
        {
          title: 'Төлөв',
          key: 'status',
          dataIndex: 'status',
          render: (_, index) => (
            <Tag color={index.status ? 'success' : 'error'}>{index.status ? 'Идэвхтэй' : 'Идэвхгүй'}</Tag>
          ),
        },
    ];
      
    const data: any[] = [
        {
            key: '1',
            id: 1111,
            phone: '88888888',
            onoo: 0,
            last_use: 200000,
            created: '2025-02-02',
            last_login: '2025-02-02',
            status: true
        },
        {
            key: '2',
            id: 2222,
            phone: '88888889',
            onoo: 200000,
            last_use: 5000,
            created: '2025-02-02',
            last_login: '2025-02-02',
            status: true
        },
        {
            key: '3',
            id: 3333,
            phone: '88888887',
            onoo: 200000,
            last_use: 500,
            created: '2025-02-02',
            last_login: '2025-02-02',
            status: true
        },
    ];

    return(
        <div className="dashboard-page">
            <div className="box">
                <div className="box-head">
                    <p className="title">Хэрэглэгчийн жагсаалт</p>
                    <p className="desc">Нийт: <span>3</span></p>
                </div>
                <div className="box-body">
                    <Table<any> columns={columns} dataSource={data} />
                </div>
            </div>
        </div>
    )
}

export default Product;