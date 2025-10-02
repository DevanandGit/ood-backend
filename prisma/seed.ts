// import { PrismaClient, Roles, PaymentMethod, OrderStatus, PaymentStatus } from '@prisma/client';
// import { faker } from '@faker-js/faker';

// const prisma = new PrismaClient();

// async function main() {
//     console.log('🌱 Seeding database...');

//     // ----- USERS -----
//     for (let i = 0; i < 5; i++) {
//         const user = await prisma.user.create({
//             data: {
//                 email: faker.internet.email(),
//                 password: faker.internet.password(),
//                 role: Roles.CUSTOMER,
//                 CustomerProfile: {
//                     create: {
//                         name: faker.person.fullName(),
//                         phone: faker.phone.number(),
//                         address: faker.location.streetAddress(),
//                         city: faker.location.city(),
//                         state: faker.location.state(),
//                         postalCode: faker.location.zipCode(),
//                         country: faker.location.country(),
//                         profilePicture: faker.image.avatar(),
//                     },
//                 },
//             },
//         });

//         console.log(`Created user: ${user.email}`);
//     }

//     // ----- ADMIN -----
//     const admin = await prisma.user.create({
//         data: {
//             email: 'admin@example.com',
//             password: 'admin123',
//             role: Roles.SUPER_ADMIN,
//             AdminProfile: {
//                 create: {
//                     name: 'Super Admin',
//                     phone: faker.phone.number(),
//                 },
//             },
//         },
//     });

//     console.log(`Created admin: ${admin.email}`);

//     // ----- PRODUCTS -----
//     for (let i = 0; i < 10; i++) {
//         const product = await prisma.product.create({
//             data: {
//                 name: faker.commerce.productName(),
//                 categoryName: faker.commerce.department(),
//                 discountedPrice: faker.number.float({ min: 100, max: 500, fractionDigits: 2 }),
//                 actualPrice: faker.number.float({ min: 500, max: 1000, fractionDigits: 2 }),
//                 description: faker.commerce.productDescription(),
//                 stockCount: faker.number.int({ min: 10, max: 100 }),
//                 isStock: true,
//                 images: {
//                     create: [
//                         {
//                             url: faker.image.url(),
//                             altText: faker.commerce.productAdjective(),
//                             isMain: true,
//                         },
//                     ],
//                 },
//             },
//         });

//         console.log(`Created product: ${product.name}`);
//     }

//     // ----- COUPONS -----
//     for (let i = 0; i < 3; i++) {
//         await prisma.coupon.create({
//             data: {
//                 couponName: `DISCOUNT${i + 1}`,
//                 ValueType: i % 2 === 0 ? 'percentage' : 'amount',
//                 Value: i % 2 === 0 ? '10' : '200',
//                 minimumSpent: 1000,
//                 usageLimitPerPerson: 1,
//                 validFrom: '2025-01-01',
//                 ValidTill: '2025-12-31',
//             },
//         });
//     }

//     // ----- SAMPLE ORDER -----
//     const customer = await prisma.customerProfile.findFirst();
//     const product = await prisma.product.findFirst();

//     if (customer && product) {
//         const order = await prisma.order.create({
//             data: {
//                 orderNumber: `ORD-${Date.now()}`,
//                 status: OrderStatus.confirmed,
//                 paymentStatus: PaymentStatus.completed,
//                 totalAmount: product.discountedPrice,
//                 shippingCost: 50,
//                 taxAmount: 18,
//                 discountAmount: 0,
//                 CustomerProfile: {
//                     connect: { id: customer.id },
//                 },
//                 items: {
//                     create: [
//                         {
//                             product: { connect: { id: product.id } },
//                             quantity: 2,
//                             discountedPrice: product.discountedPrice,
//                             actualPrice: product.actualPrice,
//                         },
//                     ],
//                 },
//                 Payment: {
//                     create: {
//                         amount: product.discountedPrice,
//                         method: PaymentMethod.credit_card,
//                         status: PaymentStatus.completed,
//                         transactionId: faker.string.uuid(),
//                     },
//                 },
//             },
//         });

//         console.log(`Created sample order: ${order.orderNumber}`);
//     }

//     console.log('✅ Seeding completed!');
// }

// main()
//     .then(() => prisma.$disconnect())
//     .catch(async (e) => {
//         console.error(e);
//         await prisma.$disconnect();
//         process.exit(1);
//     });
