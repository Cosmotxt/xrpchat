'use client'

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "../src/ui/avatar"
import { Button } from "../src/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../src/ui/card"
import { Input } from "../src/ui/input"
import { useState, useEffect, useRef } from 'react'
import { ScrollArea } from "../src/ui/scroll-area"
import { Skeleton } from "../src/ui/skeleton"
import { useDropzone } from 'react-dropzone'
import Login from './login'
import Register from './register'
import { useAuth } from '../context/authContext'
import MarkdownDisplay from '../src/ui/markdown-display'

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

let messageId = 0

interface Responses {
    [key: string]: string;
}

const tips_responses: Responses = {
    'O que é o Real Digital e quais suas caracteristicas?': 
    `
O Real Digital é uma moeda digital que está sendo desenvolvida pelo Banco Central do Brasil. É uma representação digital da moeda brasileira, o real, e estará disponível em uma plataforma eletrônica controlada pelo banco central.\n
**Aqui estão algumas características importantes do Digital Real:**
1. CBDC: Digital Real é um tipo de CBDC, o que significa que é uma moeda digital emitida por um banco central.Ele fornece confiabilidade, estabilidade e previsibilidade que vêm com regulamentação, semelhante à moeda física.
2. Tecnologia do Ledger distribuída (DLT): o Digital Real é construído com a tecnologia Distributed Ledger, especificamente uma rede descentralizada.Isso significa que as informações não são armazenadas em um único computador, mas em uma rede de computadores que verificam e fornecem acesso simultaneamente às informações, tornando o sistema mais seguro.
3. Contratos inteligentes: o Digital Real permite o uso de contratos inteligentes, que são contratos auto-executados com os termos do contrato diretamente escritos em linhas de código.Os contratos inteligentes permitem transações automatizadas e seguras, eliminando a necessidade de intermediários e reduzindo os custos.
4. Redução dos custos: Um dos benefícios do Real Digital é o potencial de redução de custos.Os contratos inteligentes e o uso de plataformas eletrônicas podem automatizar e simplificar as transações, tornando-as mais eficientes e mais baratas.
5. Acesso aos serviços financeiros tradicionais: o Digital Real pretende facilitar o acesso aos serviços financeiros tradicionais e permitir o desenvolvimento de novos modelos de negócios na plataforma DLT gerenciada pelo banco central.Isso pode potencialmente expandir a inclusão financeira e abrir novas oportunidades para indivíduos e empresas.
É importante observar que o Digital Real ainda está na fase de desenvolvimento, e sua implementação e impacto completos na economia ainda não foram completamente determinados.''',
    `,

    'O Real Digital é uma criptomoeda?': 
    `
Não, o Real Digital não é uma criptomoeda. O Real Digital é uma moeda digital emitida pelo Banco Central do Brasil e é regulada pela autoridade monetária. 
Diferentemente das criptomoedas, o Real Digital não possui a mesma volatilidade de preços e é respaldado pelo Banco Central, oferecendo estabilidade 
e previsibilidade em seu valor. Além disso, o Real Digital tem o objetivo de facilitar o acesso a serviços financeiros tradicionais e 
reduzir custos de transação, enquanto as criptomoedas são tipicamente descentralizadas e não são controladas por uma autoridade central.`,

    'O que é a Vega Crypto?':
    `
Vega Crypto é uma statup Brasileira de consultoria em web3 que oferece serviços de consultoria, pesquisa e educação financeira descentralizada para indivíduos e empresas.
    `,

    'Qual a diferença do Real Digital para o pix?': 
    `
# Diferenças entre Real Digital e PIX

O Real Digital e o PIX são duas iniciativas diferentes do Banco Central do Brasil, cada uma com seu próprio objetivo e características. 
Aqui estão as principais diferenças entre os dois:

1. Natureza e função:

- **Real Digital**: É a versão digital da moeda brasileira, o Real. O objetivo é modernizar o sistema monetário, permitindo transações com ativos 
digitais e contratos inteligentes em um ambiente seguro e regulamentado.
- **PIX**: É um sistema de pagamento instantâneo que permite transferências e pagamentos em tempo real, 24/7, sem a necessidade de intermediários. 
PIX não é uma moeda nova, mas uma maneira rápida e eficiente de mover o real existente.

2. Tecnologia:

- **Real Digital**: Opera em uma plataforma distribuída de tecnologia do Ledger (DLT), que fornece um sistema seguro e descentralizado para gravar transações.
- **PIX**: É baseado em uma infraestrutura de processamento centralizada, mas com operações quase instantâneas.

3. Regulamentação e emissão:

- **Real Digital**: Será emitido e regulamentado pelo Banco Central, servindo como uma extensão digital da moeda física.
- **PIX**: Não envolve a emissão de uma nova moeda. É simplesmente um meio de transferir e pagar usando o real existente.

4. Casos de uso:

- **Real Digital**: Pretende facilitar transações com ativos digitais e contratos inteligentes, além de outras aplicações financeiras avançadas, 
para otimizar e fornecer mais serviços financeiros aos brasileiros.
- **PIX**: Concentra-se em transferências e pagamentos rápidos, entre indivíduos, indivíduos e empresas ou entre empresas.

Em resumo, enquanto o Real Digital é uma representação digital da moeda brasileira com potencial para revolucionar o sistema financeiro e monetário, 
o PIX é simplesmente um sistema de pagamento que já transformou como os brasileiros transferem dinheiro e efetuam pagamentos em suas vidas diárias.
    `,

    'Quais os principais benefícios do Real Digital?': 
    `
**Os principais benefícios do Real Digital incluem:**
* Facilitação do acesso a serviços financeiros tradicionais, especialmente para pessoas sem acesso a contas bancárias.
* Redução de custos de transação, tornando as transações mais eficientes e econômicas.
* Maior segurança e proteção contra fraudes, devido à tecnologia de criptografia utilizada.
* Possibilidade de uso de contratos inteligentes, que automatizam e garantem a execução de transações com base em condições pré-definidas.
* Potencial para impulsionar a inovação financeira e o desenvolvimento de novos modelos de negócios.
É importante ressaltar que o Real Digital está em fase de desenvolvimento e sua implementação completa ainda está por vir. Os benefícios mencionados são baseados nas expectativas e nas possibilidades que a moeda digital pode trazer.
    `,

    'Quais os riscos do Real Digital?': 
    `
**Os riscos do Real Digital podem incluir:**
* Possíveis vulnerabilidades de segurança que podem ser exploradas por hackers e cibercriminosos.
* Desafios técnicos e operacionais, como a escalabilidade da rede e a interoperabilidade com outros sistemas financeiros.
* Preocupações relacionadas à privacidade e proteção de dados, uma vez que as transações digitais podem envolver a coleta e o armazenamento de 
informações pessoais.
É fundamental que o Banco Central adote medidas robustas de segurança e privacidade para mitigar esses riscos e garantir a confiança dos usuários no Real Digital.
    
    `
};

export default function Chat() {
    const [isLoginOpen, setIsLoginOpen] = useState(true) 
    const [isLoading, setIsLoading] = useState(false)
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [input, setInput] = useState('')
    const [selectedLang, setSelectedLang] = useState('pt')
    const [messages, setMessages] = useState<any[]>([])
    const messageEndRef = useRef<HTMLDivElement>(null)
    const [userId, setUserId] =  useState(0)
    const [tipsView, setTipsView] = useState('flex flex-wrap justify-center max-w-[100%] gap-10 mt-48 absolute max-lg:flex-nowrap max-lg:flex-col max-lg:mt-10')
    const { successfulLogin, logMessage } = useAuth();
    const [loginMessage, setLoginMessage] = useState('')
    const [showLoginMessage, setShowLoginMessage] = useState(false);

    const onDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
          const file = acceptedFiles[0]
          setSelectedImage(file)
        }
    }

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
    })

    const handleLogin = () => {
        if(!isLoginOpen) {
            setIsLoginOpen(true)
        }else {
            setIsLoginOpen(false)
        }
    }    
    
    const handleInput = async () => {
        setInput('')
        
        if(input === '') {
            return
        }

        messageId++
        const newMessage = { sender: 'you', content: input, style: 'flex gap-2 items-start text-slate-600 text-sm justify-end mt-8', messageId: messageId}
        setMessages([...messages, newMessage])
        
        if (messageId === 1) {
            if (tips_responses.hasOwnProperty(input)) {
                messageId++
                const timer = setTimeout(() => {
                    let response: string = tips_responses[input];
                    const newResponse = { sender: 'vegabot', content: response, style: 'flex items-start gap-2 text-slate-600 text-sm mt-8' }
                    setMessages([...messages, newMessage, newResponse])
                }, 3000);
                return
            } else {
                
            }
        }

        
        const requestBody = { input: input, id: userId, lang: selectedLang, messageId: messageId }
        
        try {
            setIsLoading(true)
            setTipsView('flex hidden')
            const response = await fetch('https://vegachatbot123.rj.r.appspot.com/predict', {
                method: 'POST',
                headers: { 'Content-Type':'application/json' },
                body: JSON.stringify(requestBody),
            })

            if(!response.ok) {
                throw new Error(`request failed with status ${response.status}`)
            }

            let data = await response.json()
            if('error' in data) {
                messageId++
                let erro =  data.error
                let newContent = (erro.split('LLM output: ')[1])
                console.log(newContent)
                const newResponse = { sender: 'vegabot', content: newContent, style: 'flex items-start gap-2 text-slate-600 text-sm mt-8' }
                setMessages([...messages, newMessage, newResponse])
            } else {
                messageId++
                let newContent =  data.result
                let source = data.source
                const newResponse = { sender: 'vegabot', content: newContent, sources: source, style: 'flex items-start gap-2 text-slate-600 text-sm mt-8' }
                setMessages([...messages, newMessage, newResponse])
            }

        }catch (error: any) {
            if (error instanceof Error) {
                console.error('Erro: ', error.message)
            } else {
                console.error('Erro desconhecido: ', error)
            }
        }

    }        

    const handleConfig = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLang(event.target.value)
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleInput() 
        }
    }

    useEffect(() => {
        setUserId(getRandomInt(1, 1000000))
    },[])
    
    useEffect(() => {
        messageEndRef.current?.scrollIntoView()
        messages.map((message) => (
            message.sender === "vegabot" ? setIsLoading(false) : setIsLoading(true)
        ))
    }, [messages])
    
    useEffect(() => {
        handleInput()
    }, [tipsView])

    useEffect(() => {
        if(successfulLogin) {
            setLoginMessage(logMessage)
            setShowLoginMessage(true)
        }
    }, [successfulLogin])

    useEffect(() => {
        if (showLoginMessage) {
            const timer = setTimeout(() => {
            setShowLoginMessage(false);
        }, 2000);
      
          return () => clearTimeout(timer);
        }
    }, [showLoginMessage])

    return (
        <div>
            <Card className="flex flex-col justify-between w-[80vh] rounded-[20px] max-lg:w-screen max-lg:h-screen max-lg:rounded-none ">
                <CardHeader className="w-full h-[100px] pt-[15px] bg-neutral-900 rounded-t-[20px] max-lg:rounded-none max-lg:h-[80px]">
                    <div>
                        <div className='flex items-center justify-between mx-auto my-0 max-w-[90%]'>
                            <img src="./logo.png" alt="" className='max-w-[8vh] max-lg:mx-auto max-lg:hidden'/>
                            <div className='flex items-center justify-between w-[280px] max-lg:mx-auto max-lg:my-0'>
                                <div className='flex gap-2'>
                                    <select value={selectedLang} onChange={handleConfig} className='bg-slate-60 w-40 rounded-lg cursor-pointer from-neutral-300 py-1 pl-3 pr-8'>
                                        <option value="pt">Português</option>
                                        <option value="es">Español</option>
                                        <option value="en">English</option>
                                        <option value="fr">Français</option>
                                        <option value="ko">한국어</option>
                                        <option value="de">Deutsch</option>
                                        <option value="ru">Русский</option>
                                        <option value="ja">日本語</option>
                                    </select>
                                </div>
                                <div className=''>
                                    <a href="https://www.instagram.com/vegacrypto/" target='_blank'><svg xmlns="http://www.w3.org/2000/svg" height="2.5em" fill='#dc2c2a' viewBox="0 0 448 512"><style></style><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg></a>
                                </div>
                                <div>
                                    <a href="https://discord.com/invite/D6nMD2CSs6" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" height="2.5em" fill='#dc2c2a' viewBox="0 0 640 512"><path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"/></svg></a>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </CardHeader>
                <CardContent>              
                    <ScrollArea className="h-[70vh] w-full pr-4 max-lg:h-[74vh]" >
                        <div className={tipsView}>
                            <Card className="w-[250px] bg-transparent text-gray-800 border-gray-300 rounded-[1.5rem] max-lg:max-w-full max-lg:w-[100vw]">
                                <CardContent className="flex text-center flex-col gap-2 px-6 py-3 text-sm cursor-pointer" onClick={()=>{
                                    setInput('O que é o Real Digital e quais suas caracteristicas?')
                                    setTipsView('flex hidden')
                                }}>
                                    <div>
                                        O que é o Real Digital e quais suas caracteristicas?
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="w-[250px] bg-transparent text-gray-800 border-gray-300 rounded-[1.5rem] max-lg:max-w-full max-lg:w-[100vw]">
                                <CardContent className="flex w-full text-center flex-col gap-2 px-6 py-3 text-sm cursor-pointer" onClick={()=>{
                                    setInput('O Real Digital é uma criptomoeda?')
                                    setTipsView('flex hidden')
                                }}>
                                    <div>
                                        O Real Digital é uma criptomoeda?
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="w-[250px] bg-transparent text-gray-800 border-gray-300 rounded-[1.5rem] max-lg:hidden">
                                <CardContent className="flex w-full text-center flex-col gap-2 px-6 py-3 text-sm cursor-pointer" onClick={()=>{
                                    setInput('O que é a Vega Crypto?')
                                    setTipsView('flex hidden')
                                }}>
                                    <div className='mt-[0.7em]'>
                                        O que é a Vega Crypto?
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="w-[250px] bg-transparent text-gray-800 border-gray-300 rounded-[1.5rem] max-lg:hidden">
                                <CardContent className="flex w-full text-center flex-col gap-2 px-6 py-3 text-sm cursor-pointer" onClick={()=>{
                                    setInput('Qual a diferença do Real Digital para o pix?')
                                    setTipsView('flex hidden')
                                }}>
                                    <div>
                                        Qual a diferença do Real Digital para o pix?
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="w-[250px] bg-transparent text-gray-800 border-gray-300 rounded-[1.5rem] max-lg:max-w-full max-lg:w-[100vw]" >
                                <CardContent className="flex w-full text-center flex-col gap-2 px-6 py-3 text-sm cursor-pointer" onClick={()=>{
                                    setTipsView('flex hidden')
                                    setInput('Quais os principais benefícios do Real Digital?')
                                }}>
                                    <div>
                                        Quais os principais benefícios do Real Digital?
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="w-[250px] bg-transparent text-gray-800 border-gray-300 rounded-[1.5rem] max-lg:max-w-full max-lg:w-[100vw]">
                                <CardContent className="flex w-full text-center flex-col gap-2 px-6 py-3 text-sm cursor-pointer" onClick={()=>{
                                    setInput('Quais os riscos do Real Digital?')
                                    setTipsView('flex hidden')
                                }}>
                                    <div>
                                        Quais os riscos do Real Digital?
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {messages.map((message, index) => (
                            <div key={index}>
                               
                                {message.sender === 'you' && (
                                    <div className={message.style}>
                                        <Card className="max-w-[85%] bg-zinc-800 text-zinc-200 rounded-[1.5rem]">
                                            <CardContent className="flex flex-wrap max-w-[100%] px-6 py-3 text-sm" >
                                                {message.content}
                                            </CardContent>
                                        </Card>

                                        <Avatar>
                                            <AvatarFallback>You</AvatarFallback>
                                            {selectedImage && (
                                                <AvatarImage src={URL.createObjectURL(selectedImage)} onLoad={() => URL.revokeObjectURL(URL.createObjectURL(selectedImage))}></AvatarImage>
                                            )}
                                        </Avatar>
                                    </div>
                                )}
                            

                                {message.messageId === messages.length && (
                                    isLoading && (
                                        <div className='flex items-start space-x-4 mt-[1.5rem]'>
                                            <Skeleton className="h-10 w-10 rounded-full" />
                                            <div className="space-y-2">
                                                <Skeleton className="px-6 py-3 text-sm text-zinc-800 rounded-[1.5rem] max-lg:h-[20vh] max-lg:w-[50vw]">
                                                    Digitando...
                                                </Skeleton>
                                            </div>
                                        </div>
                                    )
                                )}

                                {message.sender == 'vegabot' && (
                                    <div key={index} className={message.style}>
                                        <Avatar>
                                            <AvatarFallback>V</AvatarFallback>
                                            <AvatarImage src='https://media.licdn.com/dms/image/C4E0BAQGyYeVLJFb-IA/company-logo_200_200/0/1641913708341?e=1700092800&v=beta&t=R3cAjt11_Y54RLcZSHnSthEtfB33EXlAT2hy3zXArvU'></AvatarImage>
                                        </Avatar>
                                        <Card className="max-w-[85%] bg-transparent text-zinc-800 rounded-[1.5rem]">
                                            <CardContent className="flex flex-wrap max-w-[100%] px-6 py-4 text-sm">
                                                <MarkdownDisplay content={message.content} />
                                            </CardContent>
                                        </Card>
                                        
                                        {/* <Accordion type="single" className='max-w-[70%] h-8 bg-zinc-800 rounded-b-3xl' collapsible>
                                            <AccordionItem value="item-1">
                                                <AccordionTrigger><span style={{color:'#DCDCDC', margin: '-50% auto'}}>Fontes:</span></AccordionTrigger>
                                                    <AccordionContent>
                                                        <div className='text-center '>
                                                            <a href={message.sources[0]}>{message.sources[0]}</a><br />
                                                            <a href={message.sources[1]}>{message.sources[1]}</a>
                                                        </div>
                                                    </AccordionContent>
                                            </AccordionItem>
                                        </Accordion> */}
                                    </div>
                                )}

                            </div>
                                
                        ))}        

                        <div ref={messageEndRef} />
                    </ScrollArea>
                </CardContent>
                <CardFooter className="w-full">
                    {isLoading ? (
                        <div className="flex space-x-2 w-full" >
                            <Input type='text' placeholder="Aguarde um momento enquanto eu processo sua resposta" value={input} onChange={e => setInput(e.target.value)}/>
                            <Button type="submit" className="bg-zinc-800"> <svg xmlns="http://www.w3.org/2000/svg" height="1.3em" fill='#dcdcdc' viewBox="0 0 512 512"><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/></svg> </Button>
                        </div>
                    ) : (
                        <div className="flex space-x-2 w-full" >
                            <Input type='text' placeholder="Me faça uma pergunta sobre o real digital." value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyPress}/>
                            <Button type="submit" className="bg-zinc-800" onClick={handleInput}> <svg xmlns="http://www.w3.org/2000/svg" height="1.3em" fill='#dcdcdc' viewBox="0 0 512 512"><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/></svg> </Button>
                        </div>
                    )}
                </CardFooter>
            </Card>

            {showLoginMessage && (
                <Card className='absolute top-6 left-[50%] translate-x-[-50%] p-[20px]'>
                    {loginMessage}
                </Card>
            )}

            {messageId > 7 && (
                <>
                    {isLoginOpen ? (
                        <Register onLoginClick={handleLogin} />
                    ) : (
                        <Login onRegisterClick={handleLogin} />
                    )}
                </>
            )}
        </div>
    )
}