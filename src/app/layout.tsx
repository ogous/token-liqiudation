export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            Layout
            <div>{children}</div>
        </div>
    );
}
