"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/lib/store";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .regex(/[A-Z]/, "Senha deve conter pelo menos uma letra maiúscula")
    .regex(/[0-9]/, "Senha deve conter pelo menos um número"),
});

type LoginForm = z.infer<typeof loginSchema>;

const DEMO_USER = {
  email: "admin@imobprime.com",
  password: "Admin123!",
  name: "Admin Demo",
};

export function AuthModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (data.email === DEMO_USER.email && data.password === DEMO_USER.password) {
        login({ name: DEMO_USER.name, email: DEMO_USER.email });
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo ao painel administrativo.",
        });
        onOpenChange(false);
        reset();
        router.push("/admin/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Erro no login",
          description: "Credenciais inválidas. Tente novamente.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro no login",
        description: "Ocorreu um erro ao fazer login. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login Administrativo</DialogTitle>
          <DialogDescription>
            Acesse o painel administrativo da ImobPrime
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              {...register("email")}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <motion.div
                className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              "Entrar"
            )}
          </Button>
        </form>
        <div className="mt-4 text-sm text-center text-muted-foreground">
          <p>Usuário demo para teste:</p>
          <p>Email: admin@imobprime.com</p>
          <p>Senha: Admin123!</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}