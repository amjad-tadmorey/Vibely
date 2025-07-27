import { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { useInsert } from '../hooks/remote/useInsert'
import Input from '../ui/Input';
import Textarea from '../ui/TextArea';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner'
import toast from 'react-hot-toast';
import { getGradientFromColor } from '../lib/getGradientFromColor';
import { useGet } from '../hooks/remote/useGet';
import { useSearchParams } from 'react-router-dom';
import { applyFont } from '../lib/applyFont'
import SocialIcons from './socialIcons';

export default function Feedback() {
    const [searchParams] = useSearchParams();
    const shop_id = searchParams.get("shop_id");

    const [showModal, setShowModal] = useState(false)
    const [rate, setRate] = useState(3);
    const [customer_name, setCustomer_name] = useState('')
    const [customer_email, setCustomer_email] = useState()
    const [content, setContent] = useState('')

    const { mutate: createFeedback, isPending, isSuccess } = useInsert('feedbacks', 'feedbacks')

    const { data: shop, isPending: isLoadingShop } = useGet('shops', {
        filters: [{ column: 'id', operator: 'eq', value: shop_id }],
    })

    if (!shop_id || isLoadingShop) return null // must view a special ui if the shop_id not found
    if (isPending) return <Spinner />

    const { color, font, social, logo, shop_name, language, welcome_title } = shop[0]
    applyFont(font)
    const gradientClass = getGradientFromColor(color);

    function handleCreateFeedback(e) {
        e.preventDefault()
        if (!content) return toast.error("We did'nt recognize any content 🤔")
        try {
            createFeedback({ shop_id, content, rate, customer_name: customer_name || 'anonymous', customer_email: null })
        } finally {
            setRate(3)
            setCustomer_name('')
            setContent('')
            setShowModal(true)
        }
    }



    return (
        <div dir={language === "AR" ? "rtl" : "ltr"} className={`min-h-screen max-w-md flex flex-col items-center overflow-hidden p-2`} style={gradientClass}>

            <header className="w-full px-6 pb-4 pt-8 flex justify-center items-center">
                <img src={logo} alt="" className='tracking-wide w-12' />
                <div className={`text-2xl font-bold `} style={{ color }}>{shop_name}</div>
            </header>

            <h2 className="text-2xl mt-8 mb-6 text-center text-gray-800 font-semibold">
                {welcome_title}
            </h2>

            <div className='w-full px-6 pb-8 flex flex-col justify-center items-center gap-4'>

                {
                    isPending ? <Spinner /> : <div className="flex flex-col gap-4 w-full">
                        <div className="flex justify-center gap-2 mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`text-3xl cursor-pointer transition-colors ${rate >= star ? 'text-yellow-400' : 'text-gray-300'
                                        }`}
                                    onClick={() => setRate(star)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>

                        <Input
                            name="name"
                            placeholder={language === 'AR' ? "اسمك؟ 😊" : "What should we call you? 😊"}
                            value={customer_name}
                            onChange={(e) => setCustomer_name(e.target.value)}
                            required
                        />

                        <Textarea
                            name="feedback"
                            placeholder={language === 'AR' ? "نحن بانتظار رأيك! شاركنا ما تفكّر فيه 😊" : "We’re all ears! Tell us what you think..."}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            rows={5}
                        />
                    </div>
                }



                <Button color={color} type="submit" onClick={handleCreateFeedback}>
                    {language === "AR" ? "تأكيد" : "Submit"}
                </Button>
            </div>


            {showModal && isSuccess && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-white/10 backdrop-blur-md">
                    <div className="bg-white rounded-t-lg sm:rounded-lg shadow-lg p-6 max-w-sm w-full transform animate-slideUp mx-1">
                        <h2 className={`text-2xl font-bold text-center mb-4`} style={{ color }}>
                            Thank you
                        </h2>
                        <p className="text-center text-gray-700 mb-6">
                            Thanks for your feedback! Could you share it on Google Reviews ?
                        </p>
                        <img className='shadow-md rounded-lg' src="/google-review.png" alt="" />
                        <SocialIcons social={social} color={color} />
                    </div>

                </div>
            )}

            <SocialIcons social={social} color={color} />

        </div>
    );
}
