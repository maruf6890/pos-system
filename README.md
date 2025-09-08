# Sales Management Dashboard

A modern web application to manage products, customers, shopkeepers, and sales transactions efficiently. Built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Shadcn UI** for a clean and responsive admin interface.

---

## Features

### Core Features
- **Products Management:** Add, edit, and view products with details such as price, stock, and discount.
- **Customer Management:** Register and manage customers with contact details and addresses.
- **Shopkeepers Management:** Register and manage shopkeepers with role-based access.
- **Sales Tracking:** Record sales with detailed information:
  - Status (`pending`, `review`, `complete`)
  - Total, Discount, Tax, Payment Type
  - Previous Due, Total Paid, Current Due
- **Quick Access:** Fast access buttons for adding new products, customers, and shopkeepers.
- **Role-Based Access Control:** 
  - Common users see only allowed menus.  
  - Admin users see all menus.

### UI Features
- Collapsible sidebar with nested menus.
- Filters for sales data by:
  - Shopkeeper Name  
  - Customer Name  
  - Due Amount  
  - Status
- Search functionality for customers.
- Table and input components built with **Shadcn UI**.
- Responsive and modern design.

### Other Features
- Favicon support for web, iOS, and Android devices.
- Data validation using **Zod**.
- Forms built with **React Hook Form**.
- Toast notifications with **Sonner**.

---

## Tech Stack
- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS, Shadcn UI
- **Forms & Validation:** React Hook Form, Zod
- **Notifications:** Sonner
- **Icons:** Lucide React
- **API Requests:** Fetch API
- **Routing:** Next.js built-in routing
