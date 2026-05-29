import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";
import { z } from "zod";

import { upsertPatient } from "@/actions/upsert-patient";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { patientsTable } from "@/db/schema";

const formSchema = z.object({
    name: z.string().trim().min(1, {message: "Nome é obrigatório"}),
    email: z.string().email({message: "E-mail inválido"}),
    phoneNumber: z.string().trim().min(1, {message: "Telefone é obrigatório"}),
    sex: z.enum(["male", "female"]).superRefine((val, ctx) => {
        if (!val) {
            ctx.addIssue({
                code: z.ZodIssueCode.invalid_type,
                expected: "string",
                received: "undefined",
                message: "Sexo é obrigatório",
            });
        }
    }),
})

interface UpsertPatientFormProps {
    isOpen: boolean;
    patient?: typeof patientsTable.$inferSelect;
    onSuccess?: () => void;   
}

const UpsertPatientForm = ({patient, onSuccess, isOpen,}: UpsertPatientFormProps) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: patient?.name ?? "",
            email: patient?.email ?? "",
            phoneNumber: patient?.phoneNumber ?? "",
            sex: patient?.sex ?? undefined,
        }
    });

    useEffect(() => {if (isOpen) { form.reset(patient);}}, [isOpen, form, patient]);

    const upsertPatientAction = useAction(upsertPatient, { 
        onSuccess: () => { toast.success("Paciente adicionado com sucesso."); onSuccess?.(); },
        onError: () => { toast.error("Erro ao adicionar paciente."); },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        upsertPatientAction.execute({...values, id: patient?.id});
    }

    return ( 
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{patient ? patient.name : "Adicionar Paciente"}</DialogTitle>
                <DialogDescription> {patient ? "Edite os dados do paciente" : "Adicione um novo paciente."}</DialogDescription>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-input-name">
                        Nome do paciente
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-input-name"
                        aria-invalid={fieldState.invalid}
                        placeholder="Digite o nome completo do paciente!"
                        autoComplete="name"
                      />                  
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                    )}
                />

                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-input-email">
                        E-mail
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-input-email"
                        aria-invalid={fieldState.invalid}
                        placeholder="example@email.com"
                        autoComplete="email"
                      />                  
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                    )}
                />

                <Controller
                    name="phoneNumber"
                    control={form.control}
                    render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-input-phonenumber">
                        Número de telefone
                      </FieldLabel>
                      <PatternFormat
                            format="(##) #####-####"
                            mask="_"
                            placeholder="(11) 99999-9999"
                            value={field.value}
                            onValueChange={(value) => {
                            field.onChange(value.value);
                            }}
                            customInput={Input}
                        />                  
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                    )}
                />
                
                <Controller
                    name="sex"
                    control={form.control}
                    render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-input-sex">
                        Sexo
                      </FieldLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione o sexo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Masculino</SelectItem>
                                <SelectItem value="female">Feminino</SelectItem>
                            </SelectContent>
                        </Select>                
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                    )}
                />

                <DialogFooter>
                    <Button type="submit" disabled={upsertPatientAction.isPending} className="w-full">
                        {upsertPatientAction.isPending ? "Salvando..." : "Salvar"}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
     );
}
 
export default UpsertPatientForm;