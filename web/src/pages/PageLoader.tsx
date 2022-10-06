import SpinnerIcon from "src/ui/icons/SpinnerIcon";

export default function PageLoader() {
    return <div className="flex-1 flex items-center justify-center">
        <SpinnerIcon className="animate-spin h-24 w-24 text-gray-900" />
    </div>
}