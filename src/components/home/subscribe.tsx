import { component$ } from "@builder.io/qwik";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Form, globalAction$ } from "@builder.io/qwik-city";

export const useSubscribeUser = globalAction$(async () => {
    return { succes: true}
})

export const Subscribe = component$(() => {
    const action = useSubscribeUser()
    return (
        <div class="bg-[#F2F2F2] flex flex-col p-5  items-center xl:items-end">
            <div class="xl:w-[600px]">
                <div class="max-w-[300px] flex flex-col gap-5 w-full">
                    <h6>Want to get a daily forecast?</h6>
                    <Form class="flex flex-col gap-5 sm:flex-row" action={action} preventdefault:submit >
                        <Input placeholder="Enter your e-mailadress" name="email" type="email" required />
                        <Button type="submit">Submit</Button>
                    </Form>
                    {action.value?.succes && <p>Your email was saved</p>}
                </div>
            </div>
        </div>
    )
})