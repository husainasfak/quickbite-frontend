import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { Tenant } from '@/lib/types';
import dynamic from 'next/dynamic';
import TenantSelect from './tenant-select';
import { getSession } from '@/lib/session';
import Logout from './logout';

const CartCounterWithoutSSR = dynamic(() => import('./cart-counter'), { ssr: false });

const Header = async () => {
    const session = await getSession();
    const tenantsResponse = await fetch(`${process.env.BACKEND_URL}/api/auth/tenant?perPage=100`, {
        next: {
            revalidate: 3600, // 1 hour
        },
    });
    // console.log('tenantsResponse',tenantsResponse)
    // if (!tenantsResponse.ok) {
    //     throw new Error('Failed to fetch tenants');
    // }

    const restaurants: { data: Tenant[] } = await tenantsResponse.json();

    return (
        <header className="bg-white">
            <nav className="container py-5 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link href={'/'}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px'
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={'14'} height={'14'} viewBox="0 0 448 512" fill='#7C3AED'><path d="M416 0C400 0 288 32 288 176l0 112c0 35.3 28.7 64 64 64l32 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128 0-112 0-208c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7L80 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224.4c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16l0 134.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8L64 16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z" /></svg>
                            <h2 className='font-extrabold text-lg'>Quick Bite</h2>
                        </div>
                    </Link>
                    <TenantSelect restaurants={restaurants} />
                </div>
                <div className="flex items-center gap-x-4">
                    <ul className="flex items-center font-medium space-x-4">
                        <li>
                            <Link className="hover:text-primary" href={'/'}>
                                Menu
                            </Link>
                        </li>
                        <li>
                            <Link className="hover:text-primary" href={'/orders'}>
                                Orders
                            </Link>
                        </li>
                    </ul>
                    <CartCounterWithoutSSR />
                    <div className="flex items-center ml-12">
                        <Phone />
                        <span>+91 9876543210</span>
                    </div>
                    {session ? (
                        <Logout />
                    ) : (
                        <Button size={'sm'} asChild>
                            <Link href="/login">Login</Link>
                        </Button>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
