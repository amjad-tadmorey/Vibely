import { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { useInsert } from '../hooks/remote/useInsert'
import { useShop } from '../context/ShopContext';
import Input from '../ui/Input';
import Textarea from '../ui/TextArea';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner'

const socialLinks = [
    { icon: <Facebook />, url: "https://facebook.com" },
    { icon: <Twitter />, url: "https://twitter.com" },
    { icon: <Instagram />, url: "https://instagram.com" },
    { icon: <Linkedin />, url: "https://linkedin.com" },
    { icon: <Youtube />, url: "https://youtube.com" },
];

export default function Feedback() {
    const { shop_id } = useShop();
    const { mutate: createFeedback, isPending, isSuccess } = useInsert('feedbacks', 'feedbacks')

    const [showModal, setShowModal] = useState(false)

    const [rate, setRate] = useState(3);
    const [customer_name, setCustomer_name] = useState('')
    const [customer_email, setCustomer_email] = useState()
    const [content, setContent] = useState('')

    function handleCreateFeedback(e) {
        e.preventDefault()
        try {
            createFeedback({ shop_id, content, rate, customer_name, customer_email: null })
        } finally {
            setRate(3)
            setCustomer_name('')
            setContent('')
            setShowModal(true)
            // proccecing the checkout
        }
    }


    if (!shop_id) return null // must view a sopecial ui if the shop_id not found

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] to-white flex flex-col items-center overflow-hidden">

            <header className="w-full px-6 pb-8 pt-12 flex justify-center items-center">
                <div className="text-2xl font-bold text-[#4e6ef2] tracking-wide">Vibely</div>
            </header>

            <h2 className="text-2xl mt-8 mb-6 text-center text-gray-800 font-semibold">
                We’d love your <span className="text-[#4e6ef2]">feedback</span>!
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
                            placeholder="What should we call you? : )"
                            value={customer_name}
                            onChange={(e) => setCustomer_name(e.target.value)}
                            required
                        />

                        <Textarea
                            name="feedback"
                            placeholder="We’re all ears! Tell us what you think..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            rows={5}
                        />
                    </div>
                }

                <Button type="submit" onClick={handleCreateFeedback}>
                    Submit
                </Button>

            </div>


            {showModal && isSuccess && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-white/10 backdrop-blur-md">
                    <div className="bg-white rounded-t-lg sm:rounded-lg shadow-lg p-6 max-w-sm w-full transform animate-slideUp mx-1">
                        <h2 className="text-2xl font-bold text-[#4e6ef2] text-center mb-4">
                            Thank you
                        </h2>
                        <p className="text-center text-gray-700 mb-6">
                            Thanks for your feedback! Could you share it on Google Reviews ?
                        </p>
                        <img className='shadow-md rounded-lg' src="/google-review.png" alt="" />
                        <div className="flex flex-row justify-center gap-3 mt-12">
                            {socialLinks.map(({ icon, url }, idx) => (
                                <a
                                    key={idx}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="shadow-md p-2 rounded-full transition duration-200 text-[#6a85f3]"
                                >
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>

                </div>
            )}

            <div className="flex flex-row justify-center gap-3">
                {socialLinks.map(({ icon, url }, idx) => (
                    <a
                        key={idx}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shadow-md p-2 rounded-full transition duration-200 text-[#4e6ef2]"
                    >
                        {icon}
                    </a>
                ))}
            </div>

        </div>
    );
}
