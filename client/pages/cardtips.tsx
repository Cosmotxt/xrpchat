import React from "react";


const CardTips = ({ text, onClick } : any) => {
    return (
        <div className="p-[2vh] w-[15vw] h-[10vh] rounded-[3vw] border text-center cursor-pointer mx-auto max-lg:w-[90%]" onClick={onClick}>
            <span className="flex flex-wrap h-full items-center justify-center text-neutral-300 text-sm">
                {text}  
            </span>
        </div>
    );
};

export default CardTips;