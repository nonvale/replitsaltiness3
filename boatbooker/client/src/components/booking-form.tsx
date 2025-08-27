import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Yacht } from "@shared/schema";

const bookingSchema = z.object({
  customerName: z.string().min(2, "Il nome deve contenere almeno 2 caratteri"),
  customerEmail: z.string().email("Inserisci un'email valida"),
  customerPhone: z.string().min(10, "Inserisci un numero di telefono valido"),
  startDate: z.string().min(1, "Seleziona una data di inizio"),
  endDate: z.string().min(1, "Seleziona una data di fine"),
  guests: z.number().min(1, "Numero di ospiti richiesto").max(20, "Massimo 20 ospiti"),
  message: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  yacht: Yacht;
}

export default function BookingForm({ yacht }: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      startDate: "",
      endDate: "",
      guests: 1,
      message: "",
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: BookingFormData & { yachtId: string; totalPrice: string }) => {
      const response = await apiRequest("POST", "/api/bookings", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      toast({
        title: "Prenotazione Inviata!",
        description: "La tua richiesta di prenotazione è stata inviata con successo. Ti contatteremo presto per confermare.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante l'invio della prenotazione. Riprova.",
        variant: "destructive",
      });
      console.error("Booking error:", error);
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    
    try {
      // Calculate total price based on dates
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);
      const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      const totalPrice = (parseFloat(yacht.pricePerDay) * days).toFixed(2);

      const bookingData = {
        ...data,
        yachtId: yacht.id,
        totalPrice,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      };

      await bookingMutation.mutateAsync(bookingData);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateTotal = () => {
    const startDate = form.watch("startDate");
    const endDate = form.watch("endDate");
    
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      return days > 0 ? parseFloat(yacht.pricePerDay) * days : 0;
    }
    return 0;
  };

  const totalPrice = calculateTotal();

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg">
      <h3 className="text-2xl font-bold text-ocean-navy mb-6">Prenota Ora</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Il tuo nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="customerPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefono</FormLabel>
                  <FormControl>
                    <Input placeholder="+39 xxx xxx xxxx" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="customerEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email@esempio.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data Inizio</FormLabel>
                  <FormControl>
                    <Input 
                      type="date" 
                      {...field} 
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data Fine</FormLabel>
                  <FormControl>
                    <Input 
                      type="date" 
                      {...field} 
                      min={form.watch("startDate") || new Date().toISOString().split('T')[0]}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="guests"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-ocean-blue">Numero di Ospiti</FormLabel>
                <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value?.toString()}>
                  <FormControl>
                    <SelectTrigger className="text-ocean-blue border-ocean-blue focus:ring-ocean-blue">
                      <SelectValue placeholder="Seleziona numero ospiti" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array.from({ length: yacht.capacity }, (_, i) => i + 1).map((num) => (
                      <SelectItem key={num} value={num.toString()} className="text-ocean-blue">
                        {num} {num === 1 ? 'ospite' : 'ospiti'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Messaggio (Opzionale)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Richieste speciali o informazioni aggiuntive..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price Summary */}
          {totalPrice > 0 && (
            <div className="bg-ocean-light p-4 rounded-2xl">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Prezzo Totale:</span>
                <span className="text-2xl font-bold text-ocean-blue">€{totalPrice.toFixed(2)}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {Math.ceil((new Date(form.watch("endDate") || "").getTime() - new Date(form.watch("startDate") || "").getTime()) / (1000 * 60 * 60 * 24))} giorni × €{yacht.pricePerDay}/giorno
              </p>
            </div>
          )}

          <div className="space-y-4">
            <Button
              type="submit"
              className="w-full bg-ocean-blue hover:bg-ocean-navy text-white py-4 text-lg font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Invio in corso...
                </>
              ) : (
                "Invia Richiesta di Prenotazione"
              )}
            </Button>
            
            <a
              href={`https://wa.me/393895194113?text=Ciao! Sono interessato a prenotare lo yacht ${yacht.name} per ${form.watch("guests")} ospiti.`}
              className="w-full bg-green-500 hover:bg-green-400 text-white py-4 rounded-lg font-semibold flex items-center justify-center transition-colors"
            >
              <i className="fab fa-whatsapp mr-2 text-xl"></i>
              Contatta via WhatsApp
            </a>
          </div>
        </form>
      </Form>
    </div>
  );
}
