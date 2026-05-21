"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { createClinic } from "@/actions/create-clinic";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const clinicFormSchema = z.object({
    name: z.string().trim().min(1, {message: "Nome é obrigatório"}),
});

const ClinicForm = () => {

    const form = useForm<z.infer<typeof clinicFormSchema>>({
        resolver: zodResolver(clinicFormSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof clinicFormSchema>) => {
        try {
            await createClinic(data.name);
        } catch (error) {
            if (isRedirectError(error)) {
                return;
            }
            console.error(error);
            toast.error("Erro ao criar clinica");
        }
    }

    return ( 
        <>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">         
                  <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-input-username">
                        Nome
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-input-username"
                        aria-invalid={fieldState.invalid}
                        placeholder="Digite o nome da clínica"
                        autoComplete="name"
                      />                  
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                    )}
                  />
                <DialogFooter>
                  <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        "Criar clinica"
                    )}
                  </Button>
                </DialogFooter>
            </form>
        </>
 );
}
 
export default ClinicForm;