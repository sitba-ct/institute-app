import { configureServices } from '../services/dependencyInjection'

const configureDependencyInjectionContainer = () => {
    configureServices();
    // add other categories here (like configure tests ? configure components ?)
}

export { configureDependencyInjectionContainer }