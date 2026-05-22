import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from 'react-number-format';
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";

import { medicalSpecialties } from "../_constants";

const formSchema = z.object({
    name: z.string().trim().min(1, {message: "Nome é obrigatório"}),
    speciality: z.string().trim().min(1, {message: "Especialidade é obrigatório"}),
    appointmentsPrice: z.number().min(1, {message: "Valor da consulta é obrigatório"}),
    availableFromWeekday: z.string(),
    availableToWeekday: z.string(),
    availableFromTime: z.string().min(1, {message: "Hora inicial é obrigatório"}),
    availableToTime: z.string().min(1, {message: "Hora final é obrigatório"}),
}).refine((data) => {
    return data.availableFromTime < data.availableToTime
}, {
    message: "Horário de início não pode ser anterior ao horário de término",
    path: ["availableToTime"],
});

const UpsertDoctorForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            speciality: "",
            appointmentsPrice: 0,
            availableFromWeekday: "1",
            availableToWeekday: "5",
            availableFromTime: "",
            availableToTime: "",
        },
    });

        const onSubmit = (values: z.infer<typeof formSchema>) => {
            console.log(values);
        }

    return ( 
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Médico</DialogTitle>
            <DialogDescription>Adicione um novo médico</DialogDescription>
          </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-input-name">
                        Nome
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-input-name"
                        aria-invalid={fieldState.invalid}
                        placeholder="Digite o nome do(a) médico(a)"
                        autoComplete="name"
                      />                  
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                    )}
                  />

                <Controller
                    name="speciality"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid} className="w-full">
                        <FieldLabel htmlFor="form-rhf-select-speciality">
                          Especialidade
                        </FieldLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger id="form-rhf-select-speciality" aria-invalid={fieldState.invalid}>
                            <SelectValue placeholder="Selecione a especialidade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {medicalSpecialties.map((speciality) => (
                                <SelectItem key={speciality.value} value={speciality.value}>{speciality.label}</SelectItem>
                              ))}
                              
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                />

                <Controller
                    name="appointmentsPrice"
                    control={form.control}
                    render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-input-appointments-price">
                        Preço da Consulta
                      </FieldLabel>
                      <NumericFormat
                        {...field}
                        id="form-rhf-input-appointments-price"
                        aria-invalid={fieldState.invalid}
                        value={field.value}
                        onValueChange={(values) => field.onChange(values.floatValue)}
                        decimalScale={2}
                        fixedDecimalScale
                        decimalSeparator=","
                        allowNegative={false}
                        allowLeadingZeros={false}
                        thousandSeparator="."
                        customInput={Input}
                        prefix="R$ "
                      />                  
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                    )}
                  />

                <Controller
                    name="availableFromWeekday"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid} className="w-full">
                        <FieldLabel htmlFor="form-rhf-select-available-from-weekday">
                          Dia Inicial de Disponibilidade
                        </FieldLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger id="form-rhf-select-available-from-weekday" aria-invalid={fieldState.invalid}>
                            <SelectValue placeholder="Selecione o dia da semana" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                                <SelectItem value="0">Domingo</SelectItem>
                                <SelectItem value="1">Segunda-feira</SelectItem>
                                <SelectItem value="2">Terça-feira</SelectItem>
                                <SelectItem value="3">Quarta-feira</SelectItem>
                                <SelectItem value="4">Quinta-feira</SelectItem>
                                <SelectItem value="5">Sexta-feira</SelectItem>
                                <SelectItem value="6">Sábado</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                />

                <Controller
                    name="availableToWeekday"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid} className="w-full">
                        <FieldLabel htmlFor="form-rhf-select-available-to-weekday">
                          Dia final de disponibilidade
                        </FieldLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger id="form-rhf-select-available-to-weekday" aria-invalid={fieldState.invalid}>
                            <SelectValue placeholder="Selecione o dia da semana" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                                <SelectItem value="0">Domingo</SelectItem>
                                <SelectItem value="1">Segunda-feira</SelectItem>
                                <SelectItem value="2">Terça-feira</SelectItem>
                                <SelectItem value="3">Quarta-feira</SelectItem>
                                <SelectItem value="4">Quinta-feira</SelectItem>
                                <SelectItem value="5">Sexta-feira</SelectItem>
                                <SelectItem value="6">Sábado</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                />

                <Controller
                    name="availableFromTime"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid} className="w-full">
                        <FieldLabel htmlFor="form-rhf-select-available-from-time">
                          Hora Inicial de Disponibilidade
                        </FieldLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger id="form-rhf-select-available-from-time" aria-invalid={fieldState.invalid}>
                            <SelectValue placeholder="Selecione a hora" />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Manhã</SelectLabel>
                                  <SelectItem value="06:00:00">06:00</SelectItem>
                                  <SelectItem value="06:30:00">06:30</SelectItem>
                                  <SelectItem value="07:00:00">07:00</SelectItem>
                                  <SelectItem value="07:30:00">07:30</SelectItem>
                                  <SelectItem value="08:00:00">08:00</SelectItem>
                                  <SelectItem value="08:30:00">08:30</SelectItem>
                                  <SelectItem value="09:00:00">09:00</SelectItem>
                                  <SelectItem value="09:30:00">09:30</SelectItem>
                                  <SelectItem value="10:00:00">10:00</SelectItem>
                                  <SelectItem value="10:30:00">10:30</SelectItem>
                                  <SelectItem value="11:00:00">11:00</SelectItem>
                                  <SelectItem value="11:30:00">11:30</SelectItem>
                                  <SelectItem value="12:00:00">12:00</SelectItem>
                                  <SelectItem value="12:30:00">12:30</SelectItem>
                              </SelectGroup>
                              <SelectSeparator />
                              <SelectGroup>
                                <SelectLabel>Tarde</SelectLabel>
                                  <SelectItem value="13:00:00">13:00</SelectItem>
                                  <SelectItem value="13:30:00">13:30</SelectItem>  
                                  <SelectItem value="14:00:00">14:00</SelectItem>  
                                  <SelectItem value="14:30:00">14:30</SelectItem>  
                                  <SelectItem value="15:00:00">15:00</SelectItem>  
                                  <SelectItem value="15:30:00">15:30</SelectItem>  
                                  <SelectItem value="16:00:00">16:00</SelectItem>  
                                  <SelectItem value="16:30:00">16:30</SelectItem>  
                                  <SelectItem value="17:00:00">17:00</SelectItem>
                                  <SelectItem value="17:30:00">17:30</SelectItem>  
                                  <SelectItem value="18:00:00">18:00</SelectItem>  
                                  <SelectItem value="18:30:00">18:30</SelectItem>
                              </SelectGroup>
                              <SelectSeparator />
                              <SelectGroup>
                                <SelectLabel>Noite</SelectLabel>
                                  <SelectItem value="19:00:00">19:00</SelectItem>
                                  <SelectItem value="19:30:00">19:30</SelectItem>  
                                  <SelectItem value="20:00:00">20:00</SelectItem>  
                                  <SelectItem value="20:30:00">20:30</SelectItem>  
                                  <SelectItem value="21:00:00">21:00</SelectItem>  
                                  <SelectItem value="21:30:00">21:30</SelectItem>  
                                  <SelectItem value="22:00:00">22:00</SelectItem>
                              </SelectGroup>
                          </SelectContent>
                        </Select>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                />

                <Controller
                    name="availableToTime"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid} className="w-full">
                        <FieldLabel htmlFor="form-rhf-select-available-to-time">
                          Hora Final de Disponibilidade
                        </FieldLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger id="form-rhf-select-available-to-time" aria-invalid={fieldState.invalid}>
                            <SelectValue placeholder="Selecione a hora" />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Manhã</SelectLabel>
                                  <SelectItem value="06:00:00">06:00</SelectItem>
                                  <SelectItem value="06:30:00">06:30</SelectItem>
                                  <SelectItem value="07:00:00">07:00</SelectItem>
                                  <SelectItem value="07:30:00">07:30</SelectItem>
                                  <SelectItem value="08:00:00">08:00</SelectItem>
                                  <SelectItem value="08:30:00">08:30</SelectItem>
                                  <SelectItem value="09:00:00">09:00</SelectItem>
                                  <SelectItem value="09:30:00">09:30</SelectItem>
                                  <SelectItem value="10:00:00">10:00</SelectItem>
                                  <SelectItem value="10:30:00">10:30</SelectItem>
                                  <SelectItem value="11:00:00">11:00</SelectItem>
                                  <SelectItem value="11:30:00">11:30</SelectItem>
                                  <SelectItem value="12:00:00">12:00</SelectItem>
                                  <SelectItem value="12:30:00">12:30</SelectItem>
                              </SelectGroup>
                              <SelectSeparator />
                              <SelectGroup>
                                <SelectLabel>Tarde</SelectLabel>
                                  <SelectItem value="13:00:00">13:00</SelectItem>
                                  <SelectItem value="13:30:00">13:30</SelectItem>  
                                  <SelectItem value="14:00:00">14:00</SelectItem>  
                                  <SelectItem value="14:30:00">14:30</SelectItem>  
                                  <SelectItem value="15:00:00">15:00</SelectItem>  
                                  <SelectItem value="15:30:00">15:30</SelectItem>  
                                  <SelectItem value="16:00:00">16:00</SelectItem>  
                                  <SelectItem value="16:30:00">16:30</SelectItem>  
                                  <SelectItem value="17:00:00">17:00</SelectItem>
                                  <SelectItem value="17:30:00">17:30</SelectItem>  
                                  <SelectItem value="18:00:00">18:00</SelectItem>  
                                  <SelectItem value="18:30:00">18:30</SelectItem>
                              </SelectGroup>
                              <SelectSeparator />
                              <SelectGroup>
                                <SelectLabel>Noite</SelectLabel>
                                  <SelectItem value="19:00:00">19:00</SelectItem>
                                  <SelectItem value="19:30:00">19:30</SelectItem>  
                                  <SelectItem value="20:00:00">20:00</SelectItem>  
                                  <SelectItem value="20:30:00">20:30</SelectItem>  
                                  <SelectItem value="21:00:00">21:00</SelectItem>  
                                  <SelectItem value="21:30:00">21:30</SelectItem>  
                                  <SelectItem value="22:00:00">22:00</SelectItem>
                              </SelectGroup>
                          </SelectContent>
                        </Select>
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
                        "Adicionar médico(a)"
                    )}
                  </Button>
                </DialogFooter>
            </form>
        </DialogContent>
     );
}
 
export default UpsertDoctorForm;