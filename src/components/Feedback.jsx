import { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { useInsert } from '../hooks/remote/useInsert'
import { useShop } from '../context/ShopContext';
import { toast } from 'react-toast';
import { useLoading } from '../context/LoadingContext';
const socialLinks = [
    { icon: <Facebook />, url: "https://facebook.com" },
    { icon: <Twitter />, url: "https://twitter.com" },
    { icon: <Instagram />, url: "https://instagram.com" },
    { icon: <Linkedin />, url: "https://linkedin.com" },
    { icon: <Youtube />, url: "https://youtube.com" },
];
export default function Feedback() {
    const { setIsLoading } = useLoading();
    const { shop_id } = useShop();
    const { mutate: addFeedback } = useInsert('feedbacks', 'feedbacks')

    const [rate, setRate] = useState(3);
    const [customer_name, setCustomer_name] = useState('')
    const [content, setContent] = useState('')


    function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true);
        try {
            if (!customer_name || !content) return toast.error('missing name or content')
            addFeedback({ shop_id, content, rate, customer_name, })
        } finally {
            setIsLoading(false);
        }
    }

    if (!shop_id) return null

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] to-white flex flex-col items-center overflow-hidden">
            <header className="w-full px-6 pb-8 pt-12 flex justify-center items-center">
                <div className="text-2xl font-bold text-[#4e6ef2] tracking-wide">Vibely</div>
            </header>

            <h2 className="text-2xl mt-8 mb-6 text-center text-gray-800 font-semibold">
                We’d love your <span className="text-[#4e6ef2]">feedback</span>!
            </h2>

            <form className="w-full max-w-md px-6 pb-8 flex flex-col gap-4">
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

                <input
                    type="text"
                    name="name"
                    placeholder="What should we call you? : )"
                    className="w-full p-4 rounded-xl bg-white/40 border border-blue-100 text-gray-800 shadow placeholder-gray-600 focus:outline-none focus:border-[#4e6ef2] backdrop-blur"
                    value={customer_name}
                    onChange={(e) => setCustomer_name(e.target.value)}
                    required={true}
                />

                <textarea
                    name="feedback"
                    rows="5"
                    placeholder="We’re all ears! Tell us what you think..."
                    className="w-full p-4 rounded-xl bg-white/40 border border-blue-100 text-gray-800 shadow placeholder-gray-600 focus:outline-none focus:border-[#4e6ef2] backdrop-blur resize-y"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required={true}
                ></textarea>

                <button
                    type="submit"
                    className="w-full p-4 bg-[#4e6ef2] hover:bg-[#3b55d4] text-white font-semibold rounded-xl transition-colors"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </form>
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
