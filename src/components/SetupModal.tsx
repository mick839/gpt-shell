// @flow
import * as React from 'react';
import {ReactElement, useContext, useState} from "react";
import {GlobalContext} from "../context";
import {Appearance} from "./Appearance.tsx";
import {Settings} from "./Settings.tsx";

type MenuItem = {
    name: string
    icon: ReactElement
}

type Operation = {
    isOpen: boolean
    changeOpacity?: (opacity: string) => void
    changeBlur?: (blur: number) => void
    opacity?: string
    blur?: number
}

export function SetupModal({isOpen, changeBlur, changeOpacity, opacity, blur}: Operation) {
    const {closeModal, toggleMode} = useContext(GlobalContext);
    const [curIdx, setCI] = useState<number>(0);

    const AppearanceIcon = ({isSelect}: { isSelect: boolean }) => {
        return <svg id={isSelect ? 'icon-active' : ''} className='fill-gray-600 dark:fill-gray-100' version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="21.1729" height="17.7803">
            <g>
                <rect height="17.7803" opacity="0" width="21.1729" x="0" y="0"/>
                <path
                    d="M11.373 17.6045C15.0732 17.6045 17.543 16.2949 17.543 14.3613C17.543 12.6299 16.0664 12.2432 16.0664 11.2236C16.0664 9.81738 21.1729 9.53613 21.1729 5.92383C21.1729 2.35547 17.4902 0 12.0234 0C4.84277 0 0 3.58594 0 8.95605C0 14.124 4.59668 17.6045 11.373 17.6045ZM11.373 16.1016C5.42285 16.1016 1.50293 13.2363 1.50293 8.95605C1.50293 4.47363 5.66895 1.50293 12.0234 1.50293C16.6377 1.50293 19.6699 3.2959 19.6699 5.92383C19.6699 8.99121 14.5283 8.57812 14.5283 11.2324C14.5283 12.7354 16.04 13.21 16.04 14.2471C16.04 15.3633 14.2031 16.1016 11.373 16.1016ZM10.6523 14.0273C11.9883 14.0273 13.0869 12.9287 13.0869 11.584C13.0869 10.2568 11.9883 9.1582 10.6523 9.1582C9.31641 9.1582 8.21777 10.2568 8.21777 11.584C8.21777 12.9287 9.31641 14.0273 10.6523 14.0273ZM10.6523 13.0078C9.87012 13.0078 9.2373 12.375 9.2373 11.584C9.2373 10.7139 9.90527 10.1953 10.6348 10.1865C11.3818 10.1777 12.0674 10.6875 12.0674 11.584C12.0674 12.375 11.4434 13.0078 10.6523 13.0078ZM4.43848 10.1602C5.24707 10.1602 5.89746 9.49219 5.89746 8.68359C5.89746 7.875 5.24707 7.22461 4.43848 7.22461C3.63867 7.22461 2.97949 7.875 2.97949 8.68359C2.97949 9.49219 3.63867 10.1602 4.43848 10.1602ZM7.64648 7.34766C8.66602 7.34766 9.49219 6.53027 9.49219 5.49316C9.49219 4.48242 8.65723 3.67383 7.64648 3.67383C6.61816 3.67383 5.79199 4.48242 5.79199 5.49316C5.79199 6.53027 6.61816 7.34766 7.64648 7.34766ZM12.1025 5.92383C12.9287 5.92383 13.5791 5.26465 13.5791 4.43848C13.5791 3.62109 12.9287 2.96191 12.1025 2.96191C11.2939 2.96191 10.6172 3.62109 10.6172 4.43848C10.6172 5.26465 11.2939 5.92383 12.1025 5.92383ZM16.1191 6.48633C16.7783 6.48633 17.3057 5.9502 17.3057 5.28223C17.3057 4.62305 16.7783 4.08691 16.1191 4.08691C15.4512 4.08691 14.9062 4.62305 14.9062 5.28223C14.9062 5.9502 15.4512 6.48633 16.1191 6.48633Z"
                    fillOpacity="0.85"/>
            </g>
        </svg>
    }

    const GearIcon = ({isSelect}: { isSelect: boolean }) => {
        return <svg id={isSelect ? 'icon-active' : ''} className='fill-gray-600 dark:fill-gray-100' version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18.8086" height="18.7998">
            <g>
                <rect height="18.7998" opacity="0" width="18.8086" x="0" y="0"/>
                <path
                    d="M8.5166 18.791L10.292 18.791C10.9688 18.791 11.4873 18.3779 11.6455 17.7275L12.0234 16.084L12.3047 15.9873L13.7373 16.8662C14.3086 17.2266 14.9678 17.1387 15.4512 16.6553L16.6816 15.4336C17.165 14.9502 17.2529 14.2822 16.8926 13.7197L15.9961 12.2959L16.1016 12.0322L17.7451 11.6455C18.3867 11.4873 18.8086 10.96 18.8086 10.292L18.8086 8.55176C18.8086 7.88379 18.3955 7.35645 17.7451 7.19824L16.1191 6.80273L16.0049 6.52148L16.9014 5.09766C17.2617 4.53516 17.1738 3.87598 16.6904 3.38379L15.46 2.15332C14.9854 1.67871 14.3262 1.59082 13.7549 1.94238L12.3223 2.82129L12.0234 2.70703L11.6455 1.06348C11.4873 0.413086 10.9688 0 10.292 0L8.5166 0C7.83984 0 7.32129 0.413086 7.16309 1.06348L6.77637 2.70703L6.47754 2.82129L5.05371 1.94238C4.48242 1.59082 3.81445 1.67871 3.33984 2.15332L2.11816 3.38379C1.63477 3.87598 1.53809 4.53516 1.90723 5.09766L2.79492 6.52148L2.68945 6.80273L1.06348 7.19824C0.413086 7.35645 0 7.88379 0 8.55176L0 10.292C0 10.96 0.421875 11.4873 1.06348 11.6455L2.70703 12.0322L2.80371 12.2959L1.91602 13.7197C1.54688 14.2822 1.64355 14.9502 2.12695 15.4336L3.34863 16.6553C3.83203 17.1387 4.5 17.2266 5.07129 16.8662L6.49512 15.9873L6.77637 16.084L7.16309 17.7275C7.32129 18.3779 7.83984 18.791 8.5166 18.791ZM8.65723 17.4199C8.50781 17.4199 8.42871 17.3584 8.40234 17.2178L7.875 15.0381C7.33887 14.9062 6.83789 14.6953 6.45996 14.458L4.54395 15.6357C4.43848 15.7148 4.32422 15.6973 4.21875 15.5918L3.18164 14.5547C3.08496 14.458 3.07617 14.3525 3.14648 14.2295L4.32422 12.3311C4.12207 11.9619 3.89355 11.4609 3.75293 10.9248L1.57324 10.4062C1.43262 10.3799 1.37109 10.3008 1.37109 10.1514L1.37109 8.68359C1.37109 8.52539 1.42383 8.45508 1.57324 8.42871L3.74414 7.90137C3.88477 7.33008 4.14844 6.81152 4.30664 6.48633L3.1377 4.58789C3.05859 4.45605 3.06738 4.35059 3.16406 4.24512L4.20996 3.22559C4.31543 3.12012 4.41211 3.10254 4.54395 3.18164L6.44238 4.33301C6.82031 4.12207 7.35645 3.90234 7.88379 3.75293L8.40234 1.57324C8.42871 1.43262 8.50781 1.37109 8.65723 1.37109L10.1514 1.37109C10.3008 1.37109 10.3799 1.43262 10.3975 1.57324L10.9336 3.77051C11.4785 3.91113 11.9531 4.13086 12.3486 4.3418L14.2559 3.18164C14.3965 3.10254 14.4844 3.12012 14.5986 3.22559L15.6357 4.24512C15.7412 4.35059 15.7412 4.45605 15.6621 4.58789L14.4932 6.48633C14.6602 6.81152 14.915 7.33008 15.0557 7.90137L17.2354 8.42871C17.376 8.45508 17.4375 8.52539 17.4375 8.68359L17.4375 10.1514C17.4375 10.3008 17.3672 10.3799 17.2354 10.4062L15.0469 10.9248C14.9062 11.4609 14.6865 11.9619 14.4756 12.3311L15.6533 14.2295C15.7236 14.3525 15.7236 14.458 15.6182 14.5547L14.5898 15.5918C14.4756 15.6973 14.3701 15.7148 14.2559 15.6357L12.3398 14.458C11.9619 14.6953 11.4697 14.9062 10.9336 15.0381L10.3975 17.2178C10.3799 17.3584 10.3008 17.4199 10.1514 17.4199ZM9.4043 12.7529C11.2412 12.7529 12.7529 11.2412 12.7529 9.39551C12.7529 7.56738 11.2412 6.05566 9.4043 6.05566C7.56738 6.05566 6.04688 7.56738 6.04688 9.39551C6.04688 11.2324 7.55859 12.7529 9.4043 12.7529ZM9.4043 11.3906C8.31445 11.3906 7.41797 10.4941 7.41797 9.39551C7.41797 8.31445 8.31445 7.41797 9.4043 7.41797C10.4766 7.41797 11.373 8.31445 11.373 9.39551C11.373 10.4854 10.4766 11.3906 9.4043 11.3906Z"
                    fillOpacity="0.85"/>
            </g>
        </svg>
    }

    const menus: MenuItem[] = [
        {name: '外观', icon: <AppearanceIcon isSelect={curIdx === 0}/>},
        {name: '通用', icon: <GearIcon isSelect={curIdx === 1}/>}
    ]


    return (
        <div style={{display: isOpen ? 'flex' : 'none'}}
             className='w-full h-[100vh] fixed left-0 top-0 flex items-center justify-center z-50'>
            <div
                className='rounded-xl overflow-hidden w-[40%] border-[1px] border-ter-border'>
                <div className='bg-[#f1f1ef] dark:bg-st-top h-[18%] border-b-[1px] border-b-[#c5c4c6] dark:border-b-st-bt'>
                    <div className='flex'>
                        <span onClick={() => closeModal()}
                              className='bg-[#ff6057] w-3 h-3 ml-1.5 mt-1.5 rounded-full'></span>
                        <span className='bg-[#cccdcb] dark:bg-[#5b5c5b] w-3 h-3 ml-1.5 mt-1.5 rounded-full'></span>
                        <span className='bg-[#cccdcb] dark:bg-[#5b5c5b] w-3 h-3 ml-1.5 mt-1.5 rounded-full'></span>
                    </div>
                    <div className='flex justify-center items-center'>
                        <div className='flex'>
                            {menus.map((_, idx) => {
                                return <div
                                    key={_.name + idx}
                                    onClick={() => setCI(idx)}
                                    id={idx === curIdx ? 'menu-active' : ''}
                                    className='mx-2 my-1 px-4 py-1 rounded-md flex flex-col justify-center items-center'>
                                    {_.icon}
                                    <span
                                        id={idx === curIdx ? 'name-active' : ''}
                                        className='text-xs select-none text-gray-600 dark:text-gray-100'>{_.name}</span>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
                <div className='flex-col flex items-center bg-[#ebecea] dark:bg-[#272725]'>
                    {curIdx === 0 &&
                        <Appearance blur_={blur} opacity_={opacity} changeBlur={changeBlur}
                                    changeOpacity={changeOpacity}/>}
                    {curIdx === 1 && <Settings toggleMode={toggleMode}/>}
                </div>
            </div>
        </div>
    );
}