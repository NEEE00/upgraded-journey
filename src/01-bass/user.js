import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem('用戶管理', 'sub1', <MailOutlined />, [
        getItem('增', '1'),
        getItem('删', '2'),
        getItem('改', '3'),
        getItem('查', '4'),
    ]),
    getItem('车辆管理', 'sub2', <AppstoreOutlined />, [
        getItem('增', '5'),
        getItem('删', '6'),
        getItem('改', '7'),
        getItem('查', '8'),
    ]),
    getItem('订单管理', 'sub4', <SettingOutlined />, [
        getItem('查', '9'),
        getItem('删', '2'),

    ]),
];

const App04 = () => {
    const onClick = (e) => {
        console.log('click ', e);
    };

    return (
        <Menu
            onClick={onClick}
            style={{
                width: 256,
            }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
        />
    );
};

export default App04
