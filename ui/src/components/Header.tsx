import '../App.css'
import { Button } from "@/components/ui/button"
import { Outlet, Link } from "react-router-dom";

export function Header() {
    return (
        <div className="custom-header flex flex-row justify-between items-center">
            <Link to={'/'}>
                <div className="logo flex flex-row items-center gap-x-3">
                    <svg width="57" height="32" viewBox="0 0 57 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.3013 0H26.9333V24.536H21.3013V0Z" fill="#650360"/>
                        <path d="M29.6243 0H35.2563V24.536H29.6243V0Z" fill="#650360"/>
                        <path d="M36.7894 6.72599H42.9333L46.6454 17.563L50.3573 6.72599H56.5013L46.9014 31.389H40.7574L43.6933 24.415L36.7894 6.72599Z" fill="#650360"/>
                        <path d="M18.8363 15.762C18.8442 14.5215 18.6106 13.2912 18.1483 12.14C17.7113 11.041 17.0596 10.0402 16.2313 9.196C15.3897 8.35028 14.391 7.67702 13.2913 7.21401C12.103 6.71368 10.8246 6.46316 9.53533 6.47801C3.60232 6.47801 0.000321456 10.568 0.000321456 15.762C-0.0191881 18.0858 0.849998 20.3293 2.43007 22.0333C4.01014 23.7374 6.18166 24.7732 8.50032 24.929L13.3623 19.693L13.2833 19.563V24.563H18.8373L18.8363 15.762ZM13.2623 19.583L9.43633 19.592C6.81433 19.592 3.91533 15.92 6.87233 13.043C9.49533 10.49 13.4263 12.584 13.4263 16.136L13.2623 19.583Z" fill="#650360"/>
                    </svg>
                    <div className="title font-bold text-2xl text-plum-500">Prompt Library</div>
                </div>
            </Link>
            <div className="nav flex flex-row items-center gap-x-8">
                <Link to="/prompts">Browse</Link>
                <Link to="/categories">Categories</Link>
                <Button className="bg-plum-700">Log In</Button>
            </div>
        </div>
    )
}

export default Header