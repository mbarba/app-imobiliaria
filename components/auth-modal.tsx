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

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .regex(/[A-Z]/, "Senha deve conter pelo menos uma letra maiúscula")
    .regex(/[0-9]/, "Senha deve conter pelo menos um número"),
});

const registerSchema = loginSchema.extend({
  full_name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
});

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

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
  const { login, register: signUp, resetPassword } = useAuthStore();

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLogin,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: registerForm,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
    reset: resetRegister,
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onLogin = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      toast.success("Login realizado com sucesso!");
      router.push("/admin/dashboard");
      onOpenChange(false);
      resetLogin();
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Ocorreu um erro. Tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onRegister = async (data: RegisterForm) => {
    setIsLoading(true);
    try {
      await signUp(data.email, data.password, data.full_name);
      toast.success("Cadastro realizado com sucesso!");
      onOpenChange(false);
      resetRegister();
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Ocorreu um erro. Tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onReset = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      await resetPassword(data.email);
      toast.success("Email de recuperação enviado!");
      setMode("login");
      onOpenChange(false);
      resetLogin();
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

          {mode === "login" && (
            <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  {...registerLogin("email")}
                  className={loginErrors.email ? "border-red-500" : ""}
                />
                {loginErrors.email && (
                  <p className="text-sm text-red-500">{loginErrors.email.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  {...registerLogin("password")}
                  className={loginErrors.password ? "border-red-500" : ""}
                />
                {loginErrors.password && (
                  <p className="text-sm text-red-500">{loginErrors.password.message}</p>
                )}
              </div>

              <Button
                type="button"
                variant="link"
                className="px-0"
                onClick={() => setMode("reset")}
              >
                Esqueceu sua senha?
              </Button>

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
          )}

          {mode === "register" && (
            <form onSubmit={handleRegisterSubmit(onRegister)} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Nome Completo</Label>
                <Input
                  id="full_name"
                  type="text"
                  placeholder="Seu nome completo"
                  {...registerForm("full_name")}
                  className={registerErrors.full_name ? "border-red-500" : ""}
                />
                {registerErrors.full_name && (
                  <p className="text-sm text-red-500">{registerErrors.full_name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  {...registerForm("email")}
                  className={registerErrors.email ? "border-red-500" : ""}
                />
                {registerErrors.email && (
                  <p className="text-sm text-red-500">{registerErrors.email.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  {...registerForm("password")}
                  className={registerErrors.password ? "border-red-500" : ""}
                />
                {registerErrors.password && (
                  <p className="text-sm text-red-500">{registerErrors.password.message}</p>
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
                  "Cadastrar"
                )}
              </Button>
            </form>
          )}

          {mode === "reset" && (
            <form onSubmit={handleLoginSubmit(onReset)} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  {...registerLogin("email")}
                  className={loginErrors.email ? "border-red-500" : ""}
                />
                {loginErrors.email && (
                  <p className="text-sm text-red-500">{loginErrors.email.message}</p>
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
                  "Recuperar"
                )}
              </Button>
            </form>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}