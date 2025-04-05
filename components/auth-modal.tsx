"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuthStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const authSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .regex(/[A-Z]/, "Senha deve conter pelo menos uma letra maiúscula")
    .regex(/[0-9]/, "Senha deve conter pelo menos um número"),
});

type AuthForm = z.infer<typeof authSchema>;

export function AuthModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "register" | "reset">("login");
  const router = useRouter();
  const { login, register, resetPassword } = useAuthStore();

  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthForm>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data: AuthForm) => {
    setIsLoading(true);
    try {
      if (mode === "login") {
        await login(data.email, data.password);
        toast.success("Login realizado com sucesso!");
        router.push("/admin/dashboard");
      } else if (mode === "register") {
        await register(data.email, data.password);
        toast.success("Cadastro realizado com sucesso!");
      } else if (mode === "reset") {
        await resetPassword(data.email);
        toast.success("Email de recuperação enviado!");
        setMode("login");
      }
      onOpenChange(false);
      reset();
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Ocorreu um erro. Tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "login"
              ? "Login"
              : mode === "register"
              ? "Cadastro"
              : "Recuperar Senha"}
          </DialogTitle>
          <DialogDescription>
            {mode === "login"
              ? "Acesse sua conta"
              : mode === "register"
              ? "Crie sua conta"
              : "Recupere sua senha"}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={mode} onValueChange={(value: any) => setMode(value)} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Cadastro</TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                {...registerForm("email")}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            
            {mode !== "reset" && (
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  {...registerForm("password")}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
            )}

            {mode === "login" && (
              <Button
                type="button"
                variant="link"
                className="px-0"
                onClick={() => setMode("reset")}
              >
                Esqueceu sua senha?
              </Button>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <motion.div
                  className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : mode === "login" ? (
                "Entrar"
              ) : mode === "register" ? (
                "Cadastrar"
              ) : (
                "Recuperar"
              )}
            </Button>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}