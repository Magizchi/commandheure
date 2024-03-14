import { FunctionComponent } from 'react';

interface CardProps {
    image: string;
    title: string;
    description: string;
}

const CardPresentation: FunctionComponent<CardProps> = ({ title, image, description }) =>
    <div className="bg-cover p-3 text-primary rounded-xl" style={{ backgroundImage: `url(${image})` }}>
        <div className="relative w-72 h-96 flex flex-col justify-center items-center p-2 text-center font-semibold">
            <div className="absolute w-72 h-96 bg-white opacity-75 rounded-xl z-0" />
            <h2 className="text-xl font-bold font-serif z-50">{title}</h2>
            <p className="font-sans flex justify-center items-center h-full z-50"><span>{description}</span></p>
        </div>
    </div>;

export default CardPresentation;