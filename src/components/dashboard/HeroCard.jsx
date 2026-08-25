//// components/HeroCard.jsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, Button } from '@heroui/react';
import {
    CheckCircle,
    User,
    Package,
    DollarSign,
    Calendar,
    Receipt,
    Sparkles,
} from 'lucide-react';

export default function HeroCard({ paymentData, customerEmail }) {
    const {
        title = 'title',
        price = 0,
        totalPrice = 0,
        quantity = 1,
        buyerEmail = customerEmail || 'guest@example.com',
        sessionId = '',
        paymentIntentId = '',
        createdAt = new Date().toISOString(),
    } = paymentData;

    const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(price);

    const formattedTotal = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(totalPrice);

    // Payment details as list items (matching the Pro features pattern)
    const paymentDetails = [
        { icon: User, label: 'Buyer', value: buyerEmail },
        { icon: Package, label: 'Quantity', value: `×${quantity}` },
        { icon: DollarSign, label: 'Unit Price', value: formattedPrice },
        { icon: Calendar, label: 'Purchased', value: formattedDate },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full max-w-md mx-auto mt-8"
        >
            <Card className="relative overflow-hidden border border-success/20 bg-linear-to-br from-success/12 via-surface to-surface-secondary shadow-lg shadow-success/10 dark:border-success/30 dark:from-success/20 dark:via-surface dark:to-success/8 dark:shadow-success/5">
                {/* Decorative blurs */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-12 -right-12 size-40 rounded-full bg-success/20 blur-3xl dark:bg-success/30"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-8 -left-8 size-28 rounded-full bg-success/10 blur-2xl dark:bg-success/20"
                />

                <Card.Header className="relative gap-3">
                    <span className="w-fit rounded-full bg-success/15 px-2.5 py-0.5 text-xs font-medium tracking-wide text-success dark:bg-success/25 dark:text-success-soft-foreground">
                        Payment Successful
                    </span>
                    <div className="flex items-start gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-success/15 text-success dark:bg-success/20 dark:text-success-soft-foreground">
                            <CheckCircle aria-hidden="true" className="size-5" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Card.Title>{title}</Card.Title>
                            <Card.Description>
                                Order #{sessionId.slice(-8).toUpperCase()}
                            </Card.Description>
                        </div>
                    </div>
                </Card.Header>

                <Card.Content className="relative">
                    {/* Total price prominently displayed */}
                    <div className="text-center mb-4">
                        <div className="text-3xl font-extrabold text-success">
                            {formattedTotal}
                        </div>
                        <div className="text-xs text-muted-foreground">Total</div>
                    </div>

                    <ul className="flex flex-col gap-2">
                        {paymentDetails.map(({ icon: Icon, label, value }) => (
                            <li
                                key={label}
                                className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                                <Icon aria-hidden="true" className="size-4 shrink-0 text-success" />
                                <span className="font-medium">{label}:</span>
                                <span className="truncate">{value}</span>
                            </li>
                        ))}
                    </ul>

                    {paymentIntentId && (
                        <div className="mt-3 text-xs text-muted-foreground/60 text-center break-all">
                            Payment Intent: <span className="font-mono">{paymentIntentId}</span>
                        </div>
                    )}
                </Card.Content>

                <Card.Footer className="relative flex-col gap-2 sm:flex-row">
                    <Button
                        as={Link}
                        href="/dashboard"
                        className="w-full shadow-md shadow-success/20"
                        color="success"
                    >
                        Go to Dashboard
                    </Button>
                    <Button
                        as={Link}
                        href="/"
                        className="w-full"
                        variant="bordered"
                        color="success"
                    >
                        Continue Shopping
                    </Button>
                </Card.Footer>
            </Card>
        </motion.div>
    );
}