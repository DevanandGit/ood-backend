import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {

    console.log('Seeding database...')

    // ===================== USERS ======================
    const adminUser = await prisma.user.create({
        data: {
            email: 'admin@example.com',
            role: 'ADMIN',
            is_verified: true
        }
    })

    const customerUser = await prisma.user.create({
        data: {
            email: 'customer@example.com',
            role: 'CUSTOMER',
            is_verified: true
        }
    })

    // ===================== PROFILES ======================
    const adminProfile = await prisma.adminProfile.create({
        data: { userId: adminUser.id }
    })

    const customerProfile = await prisma.customerProfile.create({
        data: { userId: customerUser.id }
    })

    // ===================== CATEGORY ======================
    const category = await prisma.category.create({
        data: {
            name: 'Electronics',
            description: 'Electronic gadgets and devices'
        }
    })

    // ====================== PRODUCT ======================
    const product = await prisma.product.create({
        data: {
            name: 'Smartphone',
            actualPrice: 1000,
            discountedPrice: 900,
            stockCount: 10,
            description: 'Latest smartphone',
            categoryId: category.id,
        }
    })

    // ==================== PRODUCT IMAGES ====================
    await prisma.productImage.create({
        data: {
            productId: product.id,
            url: 'https://example.com/product1.png',
            isMain: true
        }
    })

    // ==================== REVIEW ==========================
    await prisma.review.create({
        data: {
            customerProfileId: customerProfile.id,
            productId: product.id,
            rating: 5,
            comment: "Excellent!"
        }
    })

    // ==================== CART ============================
    await prisma.cartItem.create({
        data: {
            customerProfileId: customerProfile.id,
            productId: product.id,
            quantity: 1
        }
    })

    // ====================== COUPON =========================
    const coupon = await prisma.coupon.create({
        data: {
            couponName: 'WELCOME10',
            ValueType: 'percentage',
            Value: '10',
            minimumSpent: 500,
            validFrom: new Date().toISOString(),
            ValidTill: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
        }
    })

    await prisma.couponUsage.create({
        data: {
            customerProfileId: customerProfile.id,
            couponId: coupon.id
        }
    })

    // ==================== ADDRESS =========================
    const address = await prisma.address.create({
        data: {
            name: "Home",
            address: "123 Main Street",
            city: "Mumbai",
            state: "MH",
            postalCode: "400001",
            country: "India",
            phone: "9999999999",
            isDefault: true,
            customerProfileId: customerProfile.id
        }
    })

    // ===================== ORDER ==========================
    const order = await prisma.order.create({
        data: {
            orderNumber: 'ORDER001',
            totalAmount: 900,
            shippingCost: 50,
            taxAmount: 20,
            discountAmount: 100,
            shippingAddressId: address.id,
            customerProfileId: customerProfile.id
        }
    })

    // ================== ORDER ITEMS =======================
    await prisma.orderItem.create({
        data: {
            orderId: order.id,
            productId: product.id,
            quantity: 1,
            actualPrice: 1000,
            discountedPrice: 900
        }
    })

    // ================== PAYMENTS ==========================
    await prisma.payment.create({
        data: {
            orderId: order.id,
            amount: 900,
            status: 'completed',
            method: 'credit_card',
            transactionId: 'TXN12345'
        }
    })

    // ===================== BANK ===========================
    await prisma.bankDetails.create({
        data: {
            customerProfileId: customerProfile.id,
            accountNumber: '1234567890',
            accountHolderName: 'John Customer',
            ifscCode: 'SBIN000111'
        }
    })

    // ===================== WISHLIST =======================
    await prisma.wishlist.create({
        data: {
            customerProfileId: customerProfile.id,
            productId: product.id,
        }
    })

    // ===================== NOTIFY ME ======================
    await prisma.notifyMe.create({
        data: {
            productId: product.id,
        }
    })

    // ===================== NOTIFICATION ======================
    await prisma.notification.create({
        data: {
            userId: adminUser.id,
            title: 'Welcome Admin',
            body: 'Your admin account is created.',
        }
    })

    // ===================== DEVICE TOKEN ======================
    await prisma.deviceToken.create({
        data: {
            userId: customerUser.id,
            token: 'dummy-device-token',
        }
    })

    console.log("🌱 Seed complete!")
}


main()
    .then(async () => await prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1)
    })
