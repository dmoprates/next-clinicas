import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";

import LoginForm from "./components/login-form";
import SignUpForm from "./components/sign-up-form";



const AuthenticationPage = async () => {
      const session = await auth.api.getSession({
          headers: await headers(),
      });
      if (session?.user){
          redirect("/dashboard")
      }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Tabs defaultValue="Login" className="w-100">
        <TabsList>
          <TabsTrigger value="Login">Login</TabsTrigger>
          <TabsTrigger value="Cadastrar">Criar Conta</TabsTrigger>
        </TabsList>
        <TabsContent value="Login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="Cadastrar">
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthenticationPage;
