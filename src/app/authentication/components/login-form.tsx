"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
  name: z.string().trim().min(2, { message: "O nome deve ter pelo menos 2 caracteres" }).max(50),
  email: z.string().trim().min(1, {message: "E-mail é obrigatório"}).email({ message: "O email deve ser valido" }),
  password: z.string().trim().min(8, {message: "Senha deve ter pelo menos 8 caracteres" }),
})
  
function onSubmit(data: z.infer<typeof loginSchema>) {
    // Do something with the form values.
    console.log(data)
}

const LoginForm = () => {

    const form = useForm <z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
        name: "",
        email: "",
        password: "",
        },
    })

    return ( 
        <Card>
            <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <CardHeader>
                  <CardTitle>Login</CardTitle>
                    <CardDescription>
                      Faca login para continuar
                  </CardDescription>
                </CardHeader>
                
               <CardContent className="space-y-4"  >
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-input-username">
                        E-mail
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-input-username"
                        aria-invalid={fieldState.invalid}
                        placeholder="Digite seu e-mail"
                        autoComplete="email"
                      />                  
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                    )}
                  />

                  <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-input-username">
                        Senha
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-input-username"
                        aria-invalid={fieldState.invalid}
                        placeholder="Digite sua senha"
                        autoComplete="password"
                        type="password"
                      />                  
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                    )}
                  />

                </CardContent>
              
                <CardFooter>
                  <Button type="submit" className="w-full">Criar conta</Button>
                </CardFooter>
              </FieldGroup>
            </form>
          </Card>
     );
}
 
export default LoginForm;