/*
  Warnings:

  - You are about to drop the column `isBusinessBooking` on the `Booking` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bookingID]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bookingID` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `extraOptions` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupLocation` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PAID', 'PENDING');

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "isBusinessBooking",
ADD COLUMN     "bookingID" TEXT NOT NULL,
ADD COLUMN     "business" BOOLEAN,
ADD COLUMN     "companyName" TEXT,
ADD COLUMN     "companyVat" TEXT,
ADD COLUMN     "dropoffLocation" TEXT,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "extraOptions" JSONB NOT NULL,
ADD COLUMN     "pickupLocation" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "totalAmount" DOUBLE PRECISION NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Booking_bookingID_key" ON "Booking"("bookingID");
