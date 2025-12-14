import { PrismaClient, OrderStatus, PaymentStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Seeding analytics & order test data...')

    // ===================== FETCH EXISTING DATA =====================
    const customer = await prisma.customerProfile.findFirst()
    const category = await prisma.category.findFirst()
    const product = await prisma.product.findFirst({
        include: { images: true },
    })

    if (!customer || !category || !product) {
        throw new Error('Base seed data missing. Run primary seed first.')
    }

    // ===================== MULTIPLE PRODUCT IMAGES =====================
    if (product.images.length === 0) {
        await prisma.productImage.createMany({
            data: [
                {
                    productId: product.id,
                    url: '/uploads/products/img-1.jpg',
                    isMain: true,
                    sortOrder: 0,
                    altText: 'Front view',
                },
                {
                    productId: product.id,
                    url: '/uploads/products/img-2.jpg',
                    sortOrder: 1,
                    altText: 'Side view',
                },
                {
                    productId: product.id,
                    url: '/uploads/products/img-3.jpg',
                    sortOrder: 2,
                    altText: 'Back view',
                },
            ],
        })
    }

    // ===================== ORDERS (MULTIPLE STATES) =====================
    const orders = await prisma.order.createMany({
        data: [
            {
                orderNumber: 'ORD-AN-001',
                status: OrderStatus.pending,
                paymentStatus: PaymentStatus.pending,
                totalAmount: 500,
                shippingCost: 40,
                taxAmount: 10,
                customerProfileId: customer.id,
                createdAt: new Date('2025-01-01'),
            },
            {
                orderNumber: 'ORD-AN-002',
                status: OrderStatus.processing,
                paymentStatus: PaymentStatus.completed,
                totalAmount: 900,
                shippingCost: 50,
                taxAmount: 20,
                customerProfileId: customer.id,
                createdAt: new Date('2025-01-05'),
            },
            {
                orderNumber: 'ORD-AN-003',
                status: OrderStatus.delivered,
                paymentStatus: PaymentStatus.completed,
                totalAmount: 1200,
                shippingCost: 60,
                taxAmount: 30,
                customerProfileId: customer.id,
                createdAt: new Date('2025-01-10'),
            },
            {
                orderNumber: 'ORD-AN-004',
                status: OrderStatus.refunded,
                paymentStatus: PaymentStatus.refunded,
                totalAmount: 700,
                shippingCost: 40,
                taxAmount: 15,
                customerProfileId: customer.id,
                createdAt: new Date('2025-01-12'),
            },
        ],
    })

    // ===================== FETCH CREATED ORDERS =====================
    const createdOrders = await prisma.order.findMany({
        where: {
            orderNumber: { startsWith: 'ORD-AN' },
        },
    })

    // ===================== ORDER ITEMS =====================
    for (const order of createdOrders) {
        await prisma.orderItem.create({
            data: {
                orderId: order.id,
                productId: product.id,
                quantity: 1,
                actualPrice: product.actualPrice,
                discountedPrice: product.discountedPrice,
            },
        })
    }

    // ===================== PAYMENTS =====================
    for (const order of createdOrders) {
        if (order.paymentStatus === PaymentStatus.completed) {
            await prisma.payment.create({
                data: {
                    orderId: order.id,
                    amount: order.totalAmount,
                    status: 'completed',
                    method: 'credit_card',
                    transactionId: `TXN-${order.orderNumber}`,
                },
            })
        }
    }

    console.log('✅ Analytics & order test data seeded successfully')
}

main()
    .then(async () => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
