import { ResolverCallback, Scenario, Script } from "components/Basic/Scenario";
import styles from "./login.scenario.module.scss";
import Input from "components/Basic/Input";
import { emailValidation } from "validation";
import DefaultButton from "components/Basic/Buttons/Default";
import {useForm, FormProvider} from "react-hook-form"
import { useRef, useState } from "react";

const AuthResetScenarioComponent: React.FC<{ cb: ResolverCallback }> = ({cb}) => {

  const methods = useForm<{email: string}>({ mode: "onBlur" });

  const [email, setEmail] = useState<string>("")

  const SuccessModalRef = useRef<React.ElementRef<typeof Scenario>>(null);

  const onSubmit = methods.handleSubmit(async () => {
    
    console.log(email);

    SuccessModalRef.current?.createModal()
    
    setTimeout(()=>{
      cb(Promise.resolve(true));
    }, 1000)

  });

  return (
    <FormProvider {...methods}>
      <Scenario
        ref={SuccessModalRef}
        modalName='success-modal'
        script={AuthResetSendScript}
      />
      <div style={{display:"flex", flexDirection: "column", rowGap: "10px"}}>
        <h2>Забыл пароль</h2>
        <Input {...emailValidation} onChange={(e:any)=>setEmail(e.target.value)} value={email}/>
        <DefaultButton component="Отправить заявку" onSumbit={onSubmit}/>
      </div>
    </FormProvider>
  );
};

export const AuthResetScript: Script = {
  0: {
    content: AuthResetScenarioComponent,
    onFailure: -1,
    onSuccess: -1
  }
};

const AuthResetSendScenarioComponent: React.FC<{ cb: ResolverCallback }> = ({cb}) => {

  setTimeout(()=>{
    cb(Promise.resolve(true));
  }, 3000)

  return (
      <div className={styles.authReset}>
        <p>Запрос на восстановление пароля отправлен администратору</p>
        <p>После рассмотрения заявки вам на почту будут отправлен временный пароль</p> 
      </div>
  );
};

export const AuthResetSendScript: Script = {
  0: {
    content: AuthResetSendScenarioComponent,
    onFailure: -1,
    onSuccess: -1
  }
};