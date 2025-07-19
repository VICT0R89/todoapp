import RegisterForm from '@/components/auth/RegisterForm'

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Crear Cuenta</h1>
        <RegisterForm />
        <p className="mt-4 text-center text-sm text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </main>
  );
}
