import styles from "@/styles/Home.module.scss"; // 👈 SCSS faylni import qilamiz
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

export default function Home() {
  const router = useRouter();
  const [totalUsers, setTotalUsers] = useState<number | null>(null);

  // Auth check
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (
          typeof decoded === "object" &&
          decoded &&
          "exp" in decoded &&
          typeof (decoded as any).exp === "number" &&
          (decoded as any).exp < currentTime
        ) {
          toast.info("Token muddati tugagan. Qayta kiring.");
          router.push("/login");
        }
      } catch (error) {
        toast.info("Token xato. Qayta kiring.");
        router.push("/login");
      }
    } else {
      toast.info("Token topilmadi. Qayta kiring.");
      router.push("/login");
    }
  }, [router]);

  // Foydalanuvchilar sonini olish
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const res = await fetch("/api/getAll");
        const data = await res.json();
        setTotalUsers(data.totalUsers);
      } catch (err) {
        console.error("Xatolik:", err);
      }
    };

    fetchUserCount();
  }, []);

  return (
    <div className={styles.container}>
      <h1>👋 Salom!</h1>
      {totalUsers != null ? (
        <p>👥 Ro'yxatdan o'tgan foydalanuvchilar soni: {totalUsers}</p>
      ) : (
        <p>Yuklanmoqda...</p>
      )}
      <button
        onClick={() => {
          localStorage.removeItem("accessToken");
          toast.success("Chiqdingiz!");
          router.push("/login");
        }}
      >
        Log out
      </button>
    </div>
  );
}
