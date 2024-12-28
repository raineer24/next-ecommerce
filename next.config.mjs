// /** @type {import("next").NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "cppurogdqlwvexrdysjg.supabase.co",
//         port: "",
//         pathname: "/storage/v1/object/public//**",
//       },
//     ],
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["cloud.appwrite.io"],
    domains:['cppurogdqlwvexrdysjg.supabase.co','img.clerk.com']
  },
};

export default nextConfig;