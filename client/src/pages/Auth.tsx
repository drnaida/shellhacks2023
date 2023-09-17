import classNames from "classnames";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Themes from "../ThemableProps";
import { CreateUserRequest } from "../api/client";
import logo from "../assets/mortarboard.png";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { AuthContext } from "../components/ContextProvider";
import { TextField } from "../components/TextField";


export function Auth(): JSX.Element {
  const [submitting, setSubmitting] = useState(false);
  const { client, setUser }: AuthContext = useOutletContext();
  const navigate = useNavigate();

  const initialValues = {
    name: ""
  }

  const onSubmit = async (values: typeof initialValues) => {
    setSubmitting(true);

    let user = await client?.users_GetUserByName(values.name)
      .catch(e => console.log(`Failed to get user data: ${e}`));

    if (!user) {
      user = await client?.users_CreateUser(new CreateUserRequest({ userName: values.name }))
        .catch(e => console.log(`Failed to create new user: ${e}`));
    }

    setUser(user!);
    navigate(`/`);
  }

  const cardClasses = classNames(
    'bg-primary hover:shadow-xl',
    'absolute z-10',
    'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
    'w-1/2 min-w-[500px]',
    'flex flex-col items-center justify-evenly'
  )
  return (
    <div className="absolute w-screen h-screen bg-primary z-10">
      <Card className={cardClasses}>
        <img src={logo} alt="logo" width={64} height={64} />
        <h1 className="text-3xl font-semibold text-darkGray">What is your name?</h1>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form className="mt-10 mb-6">
            <TextField name="name" placeholder="Tim" />

            <div className="flex flex-row justify-center">
              <Button type="submit" theme={Themes.Primary} disabled={submitting}>Submit</Button>
            </div>
          </Form>
        </Formik>
      </Card>
    </div>
  )
}
