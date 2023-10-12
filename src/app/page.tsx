function ConnectButton() {
    return <w3m-button />;
}
export default function Page() {
    return (
        <div className="flex h-16 items-center justify-center">
            <ConnectButton />
        </div>
    );
}
