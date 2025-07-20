import { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { useInsert } from '../hooks/remote/useInsert'
import { useShop } from '../context/ShopContext';
import Input from '../ui/Input';
import Textarea from '../ui/TextArea';
import Button from '../ui/Button';

const socialLinks = [
    { icon: <Facebook />, url: "https://facebook.com" },
    { icon: <Twitter />, url: "https://twitter.com" },
    { icon: <Instagram />, url: "https://instagram.com" },
    { icon: <Linkedin />, url: "https://linkedin.com" },
    { icon: <Youtube />, url: "https://youtube.com" },
];

export default function Feedback() {
    const { shop_id } = useShop();
    const { mutate: createFeedback } = useInsert('feedbacks', 'feedbacks')
    const { mutate: createCustomer } = useInsert('customers', 'customers')


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
            setShowModal(false)
            // proccecing the checkout
        }
    }

    function handleCreateUser(e) {
        e.preventDefault()
        try {
            createCustomer({ shop_id, customer_name, customer_email, points_balance: 25 })
            createFeedback({ shop_id, content, rate, customer_name, customer_email })
        } finally {
            setRate(3)
            setCustomer_name('')
            setContent('')
            setCustomer_email('')
            setShowModal(false)
            // proccecing the signup
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

            <div className='w-full max-w-md px-6 pb-8 flex flex-col gap-4'>

                <div className="flex flex-col gap-4">
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

                <Button type="submit" onClick={() => setShowModal(true)}>
                    Submit
                </Button>

            </div>


            {showModal && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-white/10 backdrop-blur-md">
                    <div className="bg-white rounded-t-lg sm:rounded-lg shadow-lg p-6 max-w-sm w-full transform animate-slideUp">
                        <h2 className="text-2xl font-bold text-green-600 text-center mb-4">
                            🎉 Signup Successful!
                        </h2>
                        <p className="text-center text-gray-700 mb-6">
                            You’ve successfully created your account.
                        </p>
                        <div className='mb-12'>
                            <Input
                                name="email"
                                placeholder="example@gmail.com"
                                value={customer_email}
                                onChange={(e) => setCustomer_email(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex justify-center">
                            <Button type="submit" onClick={handleCreateUser}>
                                Submit
                            </Button>
                            <Button type="" onClick={handleCreateFeedback}>
                                Dissmis
                            </Button>
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
