
import { FunctionComponent } from "react";
import InputNumber from "@components/atoms/inputs/inputNumber";
import { Product, ProductVariant } from "@pages/products/models/product.models";
import Table from "@components/organims/Table";
import { TableProps } from "antd";

interface ShowProductsProps extends Product {
    index: number
    register: any
    onChange: (productVariantCode: number, quantity: number) => void
}

const ShowProducs: FunctionComponent<ShowProductsProps> = ({ title, brand, subTitle, origin, index, variant = [], onChange }) => {
    const columns: TableProps<ProductVariant>['columns'] = [
        {
            title: 'Nom',
            dataIndex: 'name',
            key: 'name',
            className: 'w-2/6'
        },
        {
            title: 'Volume',
            dataIndex: 'volume',
            key: 'volume',
            className: 'w-1/6'
        },
        {
            title: 'PCB',
            dataIndex: 'pcb',
            key: 'pcb',
            className: 'w-1/6'
        },
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            className: 'w-1/6'
        },
        {
            title: 'Quantité',
            dataIndex: 'quantity',
            key: 'quantity',
            className: 'w-1/6',
            render: (_, variant) => {
                return <InputNumber defaultValue={variant.quantity} onChange={(value) => { if (value) onChange(variant.id, +value) }} />
            }
        }
    ];

    return (
        <article
            className="bg-white border border-gray-200 rounded-md shadow-sm text-primary flex flex-col"
            id={title}
            key={index + title}
        >
            <div className="mx-2 my-2">
                <h2 className="font-bold">{title}</h2>
                <p>{subTitle}</p>
                <p>{brand}</p>
                <p>{origin}</p>
            </div>
            <div key={index + title} className="w-auto">
                <Table columns={columns} data={variant} />
            </div>
        </article>
    )
};

export default ShowProducs;